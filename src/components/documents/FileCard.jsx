// src/components/documents/FileCard.jsx
import React from "react"
import {
	FileText,
	Eye,
	Trash2,
	RefreshCw,
	CheckCircle,
	Clock,
	AlertCircle,
} from "lucide-react"
import { formatFileSize, getStatusColor } from "../../utils/helpers"

const FileCard = ({ file, onDelete, onReprocess }) => {
	const getStatusIcon = (status) => {
		switch (status) {
			case "processed":
				return <CheckCircle className="text-green-500" size={16} />
			case "processing":
				return <Clock className="text-yellow-500" size={16} />
			case "error":
				return <AlertCircle className="text-red-500" size={16} />
			default:
				return <Clock className="text-gray-500" size={16} />
		}
	}

	const handleDelete = () => {
		if (window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
			onDelete(file.id)
		}
	}

	const handleReprocess = () => {
		if (window.confirm(`Reprocess "${file.name}"?`)) {
			onReprocess(file.id)
		}
	}

	return (
		<div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white">
			<div className="flex items-start justify-between mb-3">
				<FileText className="text-blue-500 flex-shrink-0" size={24} />
				<div className="flex items-center space-x-2">
					{getStatusIcon(file.status)}
					<button
						className="text-gray-400 hover:text-blue-600 transition-colors"
						title="View file details"
					>
						<Eye size={16} />
					</button>
					{file.status === "error" && (
						<button
							onClick={handleReprocess}
							className="text-gray-400 hover:text-yellow-600 transition-colors"
							title="Reprocess file"
						>
							<RefreshCw size={16} />
						</button>
					)}
					<button
						onClick={handleDelete}
						className="text-gray-400 hover:text-red-600 transition-colors"
						title="Delete file"
					>
						<Trash2 size={16} />
					</button>
				</div>
			</div>

			<div>
				<p
					className="font-medium text-gray-800 truncate mb-1"
					title={file.name}
				>
					{file.name}
				</p>
				<p className="text-sm text-gray-500">
					{formatFileSize(file.size)}
				</p>
				<p className="text-xs text-gray-400">{file.uploadedAt}</p>

				<div className="mt-3">
					<span
						className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
							file.status
						)}`}
					>
						{file.status === "processed"
							? "Processed"
							: file.status === "processing"
							? "Processing..."
							: file.status === "error"
							? "Error"
							: "Pending"}
					</span>
				</div>

				{file.status === "processed" && (
					<div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
						✓ Ready for AI analysis
					</div>
				)}

				{file.status === "error" && (
					<div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
						Failed to process - click refresh to retry
					</div>
				)}
			</div>
		</div>
	)
}

export default FileCard
