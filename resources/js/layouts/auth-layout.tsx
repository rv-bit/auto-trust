import { default as AuthMainLayout } from "./auth/main-layout";

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
	return (
		<AuthMainLayout title={title} description={description} {...props}>
			{children}
		</AuthMainLayout>
	);
}
