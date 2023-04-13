import Image from "@/components/atoms/Image/image";
import { useCommits } from "@/hooks/useCommits";
import { useRepo } from "@/hooks/useRepo";
import { useEffect, useMemo } from "react";
import { useTable } from "react-table";

const CommitsTable = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useCommits();
  const columns = useMemo(
    () => [
      {
        Header: "User",
        accessor: "user",
        Cell: ({ value = "" }) => {
          return (
            <Image
              src={value ? `${value}.png` : "/fallback.png"}
              alt="commit author"
              width={48}
              height={48}
            />
          );
        },
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Description",
        accessor: "message",
      },
      {
        Header: "Commit",
        accessor: "commit",
        Cell: ({ value = "" }) => value.substring(0, 7),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value = "" }) => {
          const date = new Date(value);
          return `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns as any,
      data: data?.pages.flatMap((page) => page.data.items) ?? [],
    });

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetchingNextPage, fetchNextPage]);

  return (
    <table {...getTableProps()} className="dark:text-slate-50 w-full">
      <thead>
        {headerGroups.map((headerGroup, idx) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
            {headerGroup.headers.map((column) => (
              <th
                className="px-4 py-2 text-left"
                {...column.getHeaderProps()}
                key={column.id}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={row.id}
              className="odd:bg-gray-100 dark:odd:bg-slate-800"
            >
              {row.cells.map((cell, idx) => {
                return (
                  <td className="px-4" {...cell.getCellProps()} key={idx}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { CommitsTable };
