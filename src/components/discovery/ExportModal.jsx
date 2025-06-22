// src/components/discovery/ExportModal.jsx
import React, { useState } from "react"
import { X, Download } from "lucide-react"
import { downloadFile } from "../../utils/helpers"

const ExportModal = ({ onClose, discoveryFramework }) => {
	const [selectedSections, setSelectedSections] = useState(
		Object.keys(discoveryFramework).reduce(
			(acc, key) => ({ ...acc, [key]: true }),
			{}
		)
	)
	const [exportFormat, setExportFormat] = useState("pdf")

	const handleSectionToggle = (sectionKey) => {
		setSelectedSections((prev) => ({
			...prev,
			[sectionKey]: !prev[sectionKey],
		}))
	}

	const handleExport = () => {
		const selectedData = Object.entries(discoveryFramework)
			.filter(([key]) => selectedSections[key])
			.map(([key, section]) => ({
				title: section.title,
				questions: section.questions,
			}))

		let content = ""
		let filename = ""

		switch (exportFormat) {
			case "pdf":
				// For PDF, we'll create formatted text that can be converted
				content = "DISCOVERY FRAMEWORK REPORT\n\n"
				content += selectedData
					.map(
						(section) =>
							`${section.title.toUpperCase()}\n${"-".repeat(
								section.title.length
							)}\n` +
							section.questions
								.map((q, i) => `${i + 1}. ${q}`)
								.join("\n") +
							"\n\n"
					)
					.join("")
				filename = "discovery-framework-report.txt"
				break

			case "docx":
				// For Word, we'll create formatted text
				content = "DISCOVERY FRAMEWORK REPORT\n\n"
				content += selectedData
					.map(
						(section) =>
							`${section.title}\n\n` +
							section.questions
								.map((q, i) => `${i + 1}. ${q}\n\n`)
								.join("") +
							"\n"
					)
					.join("")
				filename = "discovery-framework-report.txt"
				break

			case "json":
				content = JSON.stringify(
					{ discoveryFramework: selectedData },
					null,
					2
				)
				filename = "discovery-framework-data.json"
				break
		}

		downloadFile(content, filename)
		alert("Discovery report exported successfully!")
		onClose()
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-96 max-w-90vw max-h-80vh overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">
						Export Discovery Report
					</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={20} />
					</button>
				</div>

				<div className="space-y-4">
					<p className="text-sm text-gray-600">
						Select sections to include in your comprehensive
						discovery report.
					</p>

					<div className="space-y-2">
						{Object.entries(discoveryFramework).map(
							([key, section]) => (
								<label
									key={key}
									className="flex items-center space-x-2"
								>
									<input
										type="checkbox"
										checked={selectedSections[key]}
										onChange={() =>
											handleSectionToggle(key)
										}
										className="rounded"
									/>
									<span className="text-sm">
										{section.title}
									</span>
								</label>
							)
						)}
					</div>

					<div className="border-t pt-4">
						<h4 className="font-medium mb-2">Export Format</h4>
						<div className="space-y-2">
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="format"
									value="pdf"
									checked={exportFormat === "pdf"}
									onChange={(e) =>
										setExportFormat(e.target.value)
									}
								/>
								<span className="text-sm">
									PDF Report (Text Format)
								</span>
							</label>
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="format"
									value="docx"
									checked={exportFormat === "docx"}
									onChange={(e) =>
										setExportFormat(e.target.value)
									}
								/>
								<span className="text-sm">
									Word Document (Text Format)
								</span>
							</label>
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="format"
									value="json"
									checked={exportFormat === "json"}
									onChange={(e) =>
										setExportFormat(e.target.value)
									}
								/>
								<span className="text-sm">JSON Data</span>
							</label>
						</div>
					</div>
				</div>

				<div className="flex justify-end space-x-3 mt-6">
					<button
						onClick={onClose}
						className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={handleExport}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
					>
						<Download size={16} />
						<span>Export Report</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ExportModal
