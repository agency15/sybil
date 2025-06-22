// src/components/progress/ProgressCard.jsx
import React from "react"
import { CheckCircle, Clock, Calendar } from "lucide-react"
import { formatDate } from "../../utils/helpers"

const ProgressCard = ({
	sectionKey,
	section,
	progress,
	isCompleted,
	onToggle,
	onViewQuestions,
	onAskAI,
	selectedClient,
}) => {
	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
			<div className="flex items-start justify-between mb-4">
				<div className="flex-1">
					<h3 className="text-lg font-medium text-gray-800 mb-2">
						{section.title}
					</h3>
					<p className="text-sm text-gray-600">
						{section.questions.length} questions in this section
					</p>
				</div>
				<button
					onClick={onToggle}
					className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
						isCompleted
							? "bg-green-100 text-green-800 hover:bg-green-200"
							: "bg-gray-100 text-gray-600 hover:bg-gray-200"
					}`}
				>
					{isCompleted ? (
						<>
							<CheckCircle size={16} />
							<span>Completed</span>
						</>
					) : (
						<>
							<Clock size={16} />
							<span>Pending</span>
						</>
					)}
				</button>
			</div>

			{progress?.completedAt && (
				<div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
					<Calendar size={12} />
					<span>Completed on {formatDate(progress.completedAt)}</span>
				</div>
			)}

			<div className="flex justify-between items-center">
				<button
					onClick={onViewQuestions}
					className="text-blue-500 hover:text-blue-600 text-sm font-medium"
				>
					View Questions →
				</button>

				<button
					onClick={onAskAI}
					disabled={!selectedClient}
					className="text-green-500 hover:text-green-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Ask AI
				</button>
			</div>
		</div>
	)
}

export default ProgressCard
