import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

// Define professional styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    fontSize: 11,
    color: "#333333",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#10B981", // Emerald accent
    paddingBottom: 20,
    marginBottom: 30,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937", // Dark slate
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  metaColumn: {
    flexDirection: "column",
    gap: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#9CA3AF", // Gray text
    textTransform: "uppercase",
    marginBottom: 6,
  },
  textBold: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  textRegular: {
    color: "#4B5563",
  },
  // Table Styling for Amount Breakdown
  table: {
    marginTop: 20,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 8,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    alignItems: "center",
  },
  colDescription: { flex: 2 },
  colAmount: { flex: 1, textAlign: "right" },
  
  // Total Section
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  totalBox: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#F0FDF4", // Light green tint
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#065F46",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  }
});

const InvoicePDF = ({ payment }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.invoiceTitle}>Invoice</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={[styles.textBold, { color: "#10B981" }]}>PAID</Text>
            <Text style={styles.textRegular}>
              Date: {new Date(payment.date).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.metaContainer}>
          {/* Bill To Info */}
          <View style={styles.metaColumn}>
            <Text style={styles.sectionTitle}>Billed To</Text>
            <Text style={styles.textBold}>{payment.name}</Text>
            <Text style={styles.textRegular}>{payment.email}</Text>
          </View>

          {/* Transaction Info */}
          <View style={[styles.metaColumn, { alignItems: "flex-end" }]}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <Text style={styles.textRegular}>
              <Text style={styles.textBold}>Txn ID: </Text>
              {payment.transactionId}
            </Text>
            <Text style={styles.textRegular}>
              Time: {new Date(payment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colDescription, { color: "#4B5563" }]}>Description</Text>
            <Text style={[styles.colAmount, { color: "#4B5563" }]}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.colDescription, styles.textBold]}>Payment Received</Text>
            <Text style={[styles.colAmount, styles.textRegular]}>৳{payment.amount}</Text>
          </View>
        </View>

        {/* Final Grand Total Summary */}
        <View style={styles.totalContainer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Total Paid:</Text>
            <Text style={styles.totalText}>৳{payment.amount}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your payment. This is a system-generated electronic invoice.
        </Text>

      </Page>
    </Document>
  );
};

export default InvoicePDF;