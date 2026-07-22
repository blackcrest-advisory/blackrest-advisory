import axios from "@/api-client/client";

type UploadResponse = {
  url: string;
  path: string;
};

export async function uploadFile(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<UploadResponse>("/api/upload", formData);

  return response.data;
}

export async function deleteFile(path: string): Promise<void> {
  await axios.delete("/api/upload/delete", {
    data: {
      path,
    },
  });
}
