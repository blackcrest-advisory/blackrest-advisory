import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Brand colors
const COLORS = {
  primary: "#1a3a5c",
  secondary: "#2d6a8f",
  accent: "#f0f4f8",
  text: "#333333",
  lightText: "#666666",
  border: "#d0d7de",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  companyTagline: {
    fontSize: 8,
    color: COLORS.lightText,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metaColumn: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: COLORS.lightText,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 10,
    color: COLORS.text,
  },
  table: {
    marginVertical: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.accent,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    color: COLORS.primary,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  tableRowAlt: {
    backgroundColor: "#f9f9f9",
  },
  colDescription: {
    flex: 2,
  },
  colAmount: {
    flex: 1,
    textAlign: "right",
  },
  colCurrency: {
    flex: 0.5,
    textAlign: "right",
  },
  totalBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: COLORS.accent,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
    border: `1px solid ${COLORS.border}`,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 20,
    color: COLORS.primary,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  footer: {
    marginTop: 40,
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: COLORS.lightText,
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    textAlign: "right",
  },
  noteBox: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    border: `1px solid ${COLORS.border}`,
  },
  noteText: {
    fontSize: 9,
    color: COLORS.lightText,
  },
});

interface InvoicePDFProps {
  invoice: {
    invoiceNumber: string;
    amount: number;
    currency: string;
    status: string;
    dueDate: Date | null;
    paidAt: Date | null;
    notes: string | null;
    createdAt: Date;
    project: {
      title: string;
      user: {
        name: string | null;
        email: string;
      };
    };
  };
}

const InvoicePDF = ({ invoice }: InvoicePDFProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const logoUrl = `${baseUrl}/logos/blackcrestlogo.png`;
  const dueDateStr = invoice.dueDate
    ? new Date(invoice.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const createdDate = new Date(invoice.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src={logoUrl} />
            <View>
              <Text style={styles.companyName}>Blackcrest Advisory</Text>
              <Text style={styles.companyTagline}>
                Consulting &amp; Technology
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
          </View>
        </View>

        {/* Meta row: Bill To & Invoice Details */}
        <View style={styles.metaRow}>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Bill To</Text>
            <Text style={styles.metaValue}>
              {invoice.project.user.name || invoice.project.user.email}
            </Text>
            <Text style={styles.metaValue}>{invoice.project.user.email}</Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.metaLabel}>Invoice Date</Text>
            <Text style={styles.metaValue}>{createdDate}</Text>
            <Text style={styles.metaLabel}>Due Date</Text>
            <Text style={styles.metaValue}>{dueDateStr}</Text>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={styles.metaValue}>{invoice.status}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderText, styles.colCurrency]}>
              Currency
            </Text>
            <Text style={[styles.tableHeaderText, styles.colAmount]}>
              Amount
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={[styles.metaValue, styles.colDescription]}>
              {invoice.project.title}
            </Text>
            <Text style={[styles.metaValue, styles.colCurrency]}>
              {invoice.currency}
            </Text>
            <Text style={[styles.metaValue, styles.colAmount]}>
              {invoice.amount.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Total box */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>
            {invoice.amount.toFixed(2)} {invoice.currency}
          </Text>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              <Text style={{ fontWeight: "bold" }}>Notes: </Text>
              {invoice.notes}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>Blackcrest Advisory</Text>
            <Text>contact@blackcrest.com</Text>
          </View>
          <View style={styles.footerRight}>
            <Text>Thank you for your business.</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
