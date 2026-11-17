export const exportToCsv = (
    filename: string,
    rows: Record<string, any>[]
): void => {
    if (!rows || !rows.length) {
        return;
    }

    const separator = ";";

    // CSV-tiedostoon tulevat seitsemän saraketta eikä muita ylimääräisiä
    const columns = [
        { key: "firstname", header: "First name" },
        { key: "lastname", header: "Last name" },
        { key: "streetaddress", header: "Street address" },
        { key: "postcode", header: "Postcode" },
        { key: "city", header: "City" },
        { key: "email", header: "Email" },
        { key: "phone", header: "Phone" }
    ];

    const csvContent = [
        columns.map(column => column.header).join(separator),

        ...rows.map(row =>
            columns.map(column => {
                let cell = row[column.key] == null
                    ? ""
                    : String(row[column.key]);

                cell = cell.replace(/"/g, '""');

                return `"${cell}"`;
            }).join(separator)
        )
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
};
