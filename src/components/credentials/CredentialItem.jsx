import React, { useState } from "react"
import { Eye, EyeOff, Trash2, Copy } from "lucide-react"
import { copyToClipboard, formatDate } from "../../utils/helpers"

const CredentialItem = ({ credential, onUpdate, onDelete }) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleFieldChange = (field, value) => {
		onUpdate(credential.id, { [field]: value })
	}

	const handleCopyPassword = async () => {
		if (credential.password) {
			const success = await copyToClipboard(credential.password)
			if (success) {
				alert("Password copied to clipboard!")
			}
		}
	}

	const handleCopyUsername = async () => {
		if (credential.username) {
			const success = await copyToClipboard(credential.username)
			if (success) {
				alert("Username copied to clipboard!")
			}
		}
	}

	return (
		<div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Platform */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Platform
					</label>
					<input
						type="text"
						placeholder="e.g., Meta Ads, Google Analytics"
						value={credential.platform}
						onChange={(e) =>
							handleFieldChange("platform", e.target.value)
						}
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Username */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Username/Email
					</label>
					<div className="relative">
						<input
							type="text"
							placeholder="Username or email"
							value={credential.username}
							onChange={(e) =>
								handleFieldChange("username", e.target.value)
							}
							className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						{credential.username && (
							<button
								onClick={handleCopyUsername}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
								title="Copy username"
							>
								<Copy size={16} />
							</button>
						)}
					</div>
				</div>

				{/* Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							value={credential.password}
							onChange={(e) =>
								handleFieldChange("password", e.target.value)
							}
							className="w-full border border-gray-300 rounded px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
							{credential.password && (
								<button
									onClick={handleCopyPassword}
									className="text-gray-400 hover:text-gray-600"
									title="Copy password"
								>
									<Copy size={16} />
								</button>
							)}
							<button
								onClick={() => setShowPassword(!showPassword)}
								className="text-gray-400 hover:text-gray-600"
								title={
									showPassword
										? "Hide password"
										: "Show password"
								}
							>
								{showPassword ? (
									<EyeOff size={16} />
								) : (
									<Eye size={16} />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Notes */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Notes
					</label>
					<input
						type="text"
						placeholder="Additional notes or instructions"
						value={credential.notes}
						onChange={(e) =>
							handleFieldChange("notes", e.target.value)
						}
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
				<div className="text-xs text-gray-500">
					Last updated: {formatDate(credential.lastUpdated)}
				</div>
				<button
					onClick={() => onDelete(credential.id)}
					className="text-red-500 hover:text-red-700 text-sm flex items-center space-x-1"
				>
					<Trash2 size={16} />
					<span>Delete</span>
				</button>
			</div>
		</div>
	)
}

export default CredentialItem
