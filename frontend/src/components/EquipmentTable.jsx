import React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"

const EquipmentTable = ({
  equipment,
  loading,
  onEdit,
  onDelete,
  onMaintenance,
  onViewMaintenance
}) => {

  if (loading) {
    return (
      <p className="text-center mt-12 text-gray-500 text-lg">
        Loading equipment...
      </p>
    )
  }

  if (!equipment || equipment.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-500 text-lg">
        No equipment found
      </p>
    )
  }

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700 border-green-200"
    if (status === "Inactive") return "bg-red-100 text-red-600 border-red-200"
    if (status === "Under Maintenance") return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-gray-100 text-gray-600 border-gray-200"
  }

  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <Table>

          {/* HEADER */}

          <TableHeader>

            <TableRow className="bg-gradient-to-r from-slate-200 to-slate-300 border-b">

              <TableHead className="pl-8 py-5 text-sm font-semibold uppercase tracking-wide text-gray-600">
                Equipment
              </TableHead>

              <TableHead className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                Type
              </TableHead>

              <TableHead className="text-center text-sm font-semibold uppercase tracking-wide text-gray-600">
                Status
              </TableHead>

              <TableHead className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                Last Cleaned
              </TableHead>

              <TableHead className="text-right pr-8 text-sm font-semibold uppercase tracking-wide text-gray-600">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>


          {/* BODY */}

          <TableBody>

            {equipment.map((item) => (

              <TableRow
                key={item.id}
                className="border-b transition-colors duration-200 hover:bg-gray-50"
              >

                {/* EQUIPMENT NAME */}

                <TableCell className="pl-8 py-6 font-medium text-gray-900 text-[15px]">
                  {item.name}
                </TableCell>


                {/* TYPE */}

                <TableCell className="text-gray-600 text-[15px]">
                  {item.type ? item.type.name : "-"}
                </TableCell>


                {/* STATUS */}

                <TableCell className="text-center">

                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </Badge>

                </TableCell>


                {/* LAST CLEANED */}

                <TableCell className="text-gray-600 text-[15px]">
                  {item.lastCleanedDate}
                </TableCell>


                {/* ACTIONS */}

                <TableCell className="pr-8 text-right">

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg hover:bg-gray-100"
                      >
                        <span className="text-xl text-gray-600">⋯</span>
                      </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      side="right"
                      sideOffset={8}
                      className="w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1"
                    >

                      <DropdownMenuItem
                        onClick={() => onEdit(item)}
                        className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
                      >
                        ✏️ Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="cursor-pointer rounded-md px-3 py-2 text-red-600 hover:bg-gray-100"
                      >
                        🗑 Delete
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onMaintenance(item)}
                        className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
                      >
                        🔧 Maintenance
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => onViewMaintenance(item)}
                        className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
                      >
                        📜 History
                      </DropdownMenuItem>

                    </DropdownMenuContent>

                  </DropdownMenu>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

    </div>
  )
}

export default EquipmentTable