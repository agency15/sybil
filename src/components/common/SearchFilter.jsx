// src/components/common/SearchFilter.jsx
import React from "react"
import { Search, Filter } from "lucide-react"

const SearchFilter = ({
	searchTerm,
	onSearchChange,
	filterType,
	onFilterChange,
	filterOptions = [],
	searchPlaceholder = "Search files...",
}) => {
	return (
		<div className="flex flex-col sm:flex-row gap-4 mb-6">
			<div className="flex-1">
				<div className="relative">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={20}
					/>
					<input
						type="text"
						placeholder={searchPlaceholder}
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			{filterOptions.length > 0 && (
				<div className="flex items-center space-x-2">
					<Filter size={20} className="text-gray-400" />
					<select
						value={filterType}
						onChange={(e) => onFilterChange(e.target.value)}
						className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{filterOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	)
}

export default SearchFilter
