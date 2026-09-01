"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { format } from "date-fns";
import { CircleDot, Inbox, MessageCircle, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";
import {
  markThreadAsRead,
  sendAdminMessage,
  sendClientMessage,
} from "@/lib/actions/messages/message.action";
import type {
  DashboardMessage,
  MessageParticipant,
  MessageProject,
} from "@/types/dashboard/messagesType";

interface MessagesWorkspaceProps {
  viewer: "CLIENT" | "ADMIN";
  viewerId: string;
  messages: DashboardMessage[];
  projects?: MessageProject[];
}

export function MessagesWorkspace({
  viewer,
  viewerId,
  messages,
  projects = [],
}: MessagesWorkspaceProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [projectId, setProjectId] = useState("none");

  const clients = useMemo(() => {
    const uniqueClients = new Map<string, MessageParticipant>();
    messages.forEach((message) => {
      const client =
        message.sender.role === "CLIENT" ? message.sender : message.receiver;
      uniqueClients.set(client.id, client);
    });
    return Array.from(uniqueClients.values());
  }, [messages]);

  const activeClientId =
    viewer === "ADMIN" &&
    clients.some((client) => client.id === selectedClientId)
      ? selectedClientId
      : (clients[0]?.id ?? null);
  const activeClient =
    viewer === "ADMIN"
      ? clients.find((client) => client.id === activeClientId)
      : null;
  const activeMessages =
    viewer === "CLIENT"
      ? messages
      : messages.filter(
          (message) =>
            message.senderId === activeClientId ||
            message.receiverId === activeClientId,
        );
  const counterpartyId =
    viewer === "CLIENT"
      ? (activeMessages.find((message) => message.senderId !== viewerId)
          ?.senderId ??
        activeMessages.find((message) => message.receiverId !== viewerId)
          ?.receiverId)
      : activeClientId;

  useEffect(() => {
    if (counterpartyId) void markThreadAsRead(counterpartyId);
  }, [counterpartyId]);

  const handleSend = () => {
    if (!body.trim()) {
      toast.error("Write a message before sending");
      return;
    }

    if (viewer === "ADMIN" && !activeClientId) {
      toast.error("Select a client first");
      return;
    }

    startTransition(async () => {
      const result =
        viewer === "CLIENT"
          ? await sendClientMessage({
              body,
              projectId: projectId === "none" ? undefined : projectId,
            })
          : await sendAdminMessage({ receiverId: activeClientId!, body });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setBody("");
      toast.success("Message sent");
      router.refresh();
    });
  };

  const projectOptions = [
    { value: "none", label: "No related project" },
    ...projects.map((project) => ({ value: project.id, label: project.title })),
  ];

  return (
    <section className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent" />

      <div
        className={`grid min-h-[680px] ${
          viewer === "ADMIN"
            ? "lg:grid-cols-[280px_minmax(0,1fr)]"
            : "grid-cols-1"
        }`}
      >
        {viewer === "ADMIN" && (
          <aside className="border-b border-border bg-muted/[0.12] lg:border-b-0 lg:border-r">
            <div className="border-b border-border px-5 py-5">
              <div className="flex items-center gap-2">
                <Inbox className="h-4 w-4 text-secondary" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                  Client inbox
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Select a client to view the full message history.
              </p>
            </div>

            <div className="max-h-[580px] overflow-y-auto">
              {clients.length === 0 ? (
                <p className="px-5 py-8 text-sm text-muted-foreground">
                  No client messages yet.
                </p>
              ) : (
                clients.map((client) => {
                  const isSelected = client.id === activeClientId;
                  const unread = messages.filter(
                    (message) =>
                      message.senderId === client.id &&
                      message.receiverId === viewerId &&
                      message.status === "UNREAD",
                  ).length;
                  return (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => setSelectedClientId(client.id)}
                      className={`flex w-full items-center gap-3 border-b border-border px-5 py-4 text-left transition-colors ${isSelected ? "bg-secondary/[0.08]" : "hover:bg-muted/50"}`}
                    >
                      <Avatar
                        src={client.avatarUrl ?? undefined}
                        name={client.name}
                        size="sm"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-heading">
                          {client.name}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {client.companyName || client.email}
                        </span>
                      </span>
                      {unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-secondary-foreground">
                          {unread > 9 ? "9+" : unread}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </aside>
        )}

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              {viewer === "ADMIN" && activeClient ? (
                <Avatar
                  src={activeClient.avatarUrl ?? undefined}
                  name={activeClient.name}
                  size="sm"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.05] text-secondary">
                  <MessageCircle className="h-4 w-4" />
                </div>
              )}
              <div className="min-w-0">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary">
                  {viewer === "ADMIN"
                    ? "Client conversation"
                    : "Blackcrest support"}
                </span>
                <h1 className="mt-1 truncate text-lg font-semibold tracking-[-0.025em] text-heading">
                  {viewer === "ADMIN"
                    ? activeClient?.name || "Select a client"
                    : "Messages with Blackcrest"}
                </h1>
              </div>
            </div>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground/50 sm:block">
              Database-saved messages
            </span>
          </div>

          <div className="flex-1 space-y-4 bg-muted/[0.05] px-5 py-6 sm:px-6">
            {activeMessages.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center border border-secondary/20 bg-secondary/[0.05] text-secondary">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-heading">
                  No messages yet
                </p>
                <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                  {viewer === "ADMIN"
                    ? "Choose a client message or wait for a new enquiry."
                    : "Send the Blackcrest team a message and we will reply here."}
                </p>
              </div>
            ) : (
              activeMessages.map((message) => {
                const isOwn = message.senderId === viewerId;
                return (
                  <article
                    key={message.id}
                    className={`flex gap-3 ${isOwn ? "justify-end" : "justify-start"}`}
                  >
                    {!isOwn && (
                      <Avatar
                        src={message.sender.avatarUrl ?? undefined}
                        name={message.sender.name}
                        size="sm"
                      />
                    )}
                    <div
                      className={`max-w-[85%] border px-4 py-3 sm:max-w-[72%] ${isOwn ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-card text-heading"}`}
                    >
                      <div className="flex items-center justify-between gap-5">
                        <span
                          className={`text-xs font-semibold ${isOwn ? "text-secondary-foreground" : "text-heading"}`}
                        >
                          {isOwn ? "You" : message.sender.name}
                        </span>
                        <time
                          className={`font-mono text-[9px] ${isOwn ? "text-secondary-foreground/70" : "text-muted-foreground/60"}`}
                        >
                          {format(new Date(message.createdAt), "MMM d, h:mm a")}
                        </time>
                      </div>
                      {message.subject && (
                        <p
                          className={`mt-2 text-xs font-semibold ${isOwn ? "text-secondary-foreground/80" : "text-secondary"}`}
                        >
                          {message.subject}
                        </p>
                      )}
                      <p
                        className={`mt-2 whitespace-pre-wrap text-sm leading-6 ${isOwn ? "text-secondary-foreground/90" : "text-muted-foreground"}`}
                      >
                        {message.body}
                      </p>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div className="border-t border-border bg-card p-5 sm:p-6">
            {viewer === "CLIENT" && projects.length > 0 && (
              <div className="mb-3 max-w-xs">
                <Select
                  options={projectOptions}
                  value={projectId}
                  onChange={setProjectId}
                />
              </div>
            )}
            <Textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={
                viewer === "ADMIN"
                  ? "Write a reply to this client..."
                  : "Write a message to the Blackcrest team..."
              }
              rows={4}
              disabled={isPending || (viewer === "ADMIN" && !activeClientId)}
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground/55">
                <CircleDot className="h-3 w-3 text-secondary" />
                Messages are saved securely
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSend}
                disabled={isPending || (viewer === "ADMIN" && !activeClientId)}
                className="group !rounded-md"
              >
                <Send className="h-3.5 w-3.5" />
                {isPending ? "Sending..." : "Send message"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
