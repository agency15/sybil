// src/components/discovery/FrameworkSection.jsx
import React from "react"

const FrameworkSection = ({
	section,
	sectionKey,
	selectedClient,
	onQuickAction,
	onSwitchToChat,
}) => {
	const handleAskAI = (question) => {
		onQuickAction(question)
		onSwitchToChat()
	}

	return (
		<div className="space-y-6">
			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<h3 className="text-lg font-medium mb-4">{section.title}</h3>
				<div className="space-y-3">
					{section.questions.map((question, index) => (
						<div
							key={index}
							className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
						>
							<div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
								{index + 1}
							</div>
							<div className="flex-1">
								<p className="text-gray-700">{question}</p>
								<button
									onClick={() => handleAskAI(question)}
									disabled={!selectedClient}
									className="text-blue-500 hover:text-blue-600 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Ask AI →
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default FrameworkSection
