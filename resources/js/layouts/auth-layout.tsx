import Layout from "@/layouts/auth/layout";

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
	return (
		<Layout title={title} description={description} {...props}>
			{children}
		</Layout>
	);
}
