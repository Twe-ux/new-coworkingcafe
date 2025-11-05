import Bootstrap from "@/components/Bootstrap";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Bootstrap>{children}</Bootstrap>;
}
