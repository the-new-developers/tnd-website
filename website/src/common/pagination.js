import { TablePagination } from "@material-ui/core";
import React from "react";

/**
 * This pagination component is implemented using
 * [TablePagination] of material-ui library.
 * A minimal pagination allowing previous(<), next(>),
 * and number of items per page to display.
 *
 * Note: current implementation only works with functional components.
 *
 * Example:
 * ```JavaScript
 * // Using hooks, define two state variables
 * // for [current-page] and [items-per-page] as:
 * const [currentPage, setCurrentPage] = useState(0);
 * const [rowsPerPage, setRowsPerPage] = useState(3);
 *
 * // Use [Pagination] component anywhare in component tree as:
 * <Pagination count={posts.length}
 *    currentPage={currentPage}
 *    rowsPerPage={rowsPerPage}
 *    setCurrentPage={setCurrentPage}
 *    setRowsPerPage={setRowsPerPage} />
 * ```
 *
 * // These params must be provided...
 * @param {count} count total number of items.
 * @param {currentPage} currentPage State variable for current visible page.
 * @param {rowsPerPage} rowsPerPage State variable for items per page.
 * @param {setCurrentPage} setCurrentPage A function to update currentPage.
 * @param {setRowsPerPage} setRowsPerPage A function to update rowsPerPage.
 * @returns [TablePagination] component with given configurations.
 */
const Pagination = (props) => <TablePagination
  page={props.currentPage}
  component="div"
  count={props.count}
  rowsPerPage={props.rowsPerPage}
  // on previous or next button clicked
  onPageChange={(_, page) => props.setCurrentPage(page)}
  // a dropdown with 3(default), 5, 8, and All items to display per page
  rowsPerPageOptions={[3, 5, 8, {
    value: props.count, label: 'All'
  }]}
  onRowsPerPageChange={e => {
    props.setCurrentPage(0);
    props.setRowsPerPage(e.target.value);
  }} />;

export default Pagination;
