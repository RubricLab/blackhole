import './styles.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body
				className={`relative flex h-full min-h-screen w-full flex-col items-center`}>
					{children}
			</body>
		</html>
	)
}
