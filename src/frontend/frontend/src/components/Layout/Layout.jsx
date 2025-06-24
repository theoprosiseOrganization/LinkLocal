import NavHeader from "../NavHeader/NavHeader";

export default function Layout({ children }) {
  return (
    <>
      <NavHeader />
      <main style={{ paddingTop: "50px" }}>{children}</main>
    </>
  );
}