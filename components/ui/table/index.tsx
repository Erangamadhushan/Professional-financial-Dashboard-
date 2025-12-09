// components/ui/table.tsx
import React from "react";

type HTMLTableProps = React.TableHTMLAttributes<HTMLTableElement>;
type HTMLTBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;
type HTMLTheadProps = React.HTMLAttributes<HTMLTableSectionElement>;
type HTMLTrProps = React.HTMLAttributes<HTMLTableRowElement>;
type HTMLTdProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  isHeader?: boolean;
};

/**
 * Table - wrapper around <table>
 */
export const Table = React.forwardRef<HTMLTableElement, HTMLTableProps>(
  function Table({ className = "min-w-full", children, ...rest }, ref) {
    return (
      <div className={`w-full overflow-x-auto ${rest.style ? "" : ""}`}>
        <table ref={ref} className={className} {...rest}>
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

/**
 * TableHeader - wrapper for <thead>
 */
export const TableHeader = React.forwardRef<HTMLTableSectionElement, HTMLTheadProps>(
  function TableHeader({ className = "", children, ...rest }, ref) {
    return (
      <thead ref={ref} className={className} {...rest}>
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = "TableHeader";

/**
 * TableBody - wrapper for <tbody>
 */
export const TableBody = React.forwardRef<HTMLTableSectionElement, HTMLTBodyProps>(
  function TableBody({ className = "", children, ...rest }, ref) {
    return (
      <tbody ref={ref} className={className} {...rest}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

/**
 * TableRow - wrapper for <tr>
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, HTMLTrProps>(
  function TableRow({ className = "", children, ...rest }, ref) {
    return (
      <tr ref={ref} className={className} {...rest}>
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

/**
 * TableCell - renders <th> when isHeader=true, otherwise <td>
 * Accepts colSpan, rowSpan, isHeader, className etc.
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, HTMLTdProps>(
  function TableCell({ isHeader = false, className = "", children, ...rest }, ref) {
    if (isHeader) {
      // Render <th>
      return (
        <th ref={ref as React.LegacyRef<HTMLTableHeaderCellElement>} className={className} {...(rest as React.ThHTMLAttributes<HTMLTableHeaderCellElement>)}>
          {children}
        </th>
      );
    }

    return (
      <td ref={ref} className={className} {...rest}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

/**
 * Default export for convenience (named exports are preferred).
 */
export default {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
};
