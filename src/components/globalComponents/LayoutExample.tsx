import {
  DefaultLayout,
  ContainerLayout,
  FullWidthLayout,
  AuthLayout,
} from "@/components/globalComponents";

/**
 * Example page demonstrating different layout usages
 */
export default function LayoutExamplePage() {
  return (
    <DefaultLayout>
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Layout Examples</h1>

        <div className="space-y-8">
          {/* Basic Usage Example */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Basic Default Layout</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground mb-2 text-sm">Code:</p>
              <pre className="bg-background rounded border p-3 text-sm">
                {`<DefaultLayout>
  <YourPageContent />
</DefaultLayout>`}
              </pre>
            </div>
          </section>

          {/* Container Layout Example */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Container Layout</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground mb-2 text-sm">Code:</p>
              <pre className="bg-background rounded border p-3 text-sm">
                {`<ContainerLayout>
  <YourPageContent />
</ContainerLayout>`}
              </pre>
              <p className="text-muted-foreground mt-2 text-sm">
                Automatically adds container, padding, and max-width
                constraints.
              </p>
            </div>
          </section>

          {/* Full Width Layout Example */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Full Width Layout</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground mb-2 text-sm">Code:</p>
              <pre className="bg-background rounded border p-3 text-sm">
                {`<FullWidthLayout>
  <YourPageContent />
</FullWidthLayout>`}
              </pre>
              <p className="text-muted-foreground mt-2 text-sm">
                Content spans the full width of the viewport.
              </p>
            </div>
          </section>

          {/* Auth Layout Example */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Auth Layout</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground mb-2 text-sm">Code:</p>
              <pre className="bg-background rounded border p-3 text-sm">
                {`<AuthLayout>
  <LoginForm />
</AuthLayout>`}
              </pre>
              <p className="text-muted-foreground mt-2 text-sm">
                No header/footer, centered content for login/register pages.
              </p>
            </div>
          </section>

          {/* Custom Props Example */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Custom Props</h2>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground mb-2 text-sm">Code:</p>
              <pre className="bg-background rounded border p-3 text-sm">
                {`<DefaultLayout
  includeHeader={false}
  includeFooter={true}
  contentClassName="bg-gray-50 p-8"
  headerProps={{ className: "bg-primary" }}
  footerProps={{ className: "bg-secondary" }}
>
  <YourPageContent />
</DefaultLayout>`}
              </pre>
            </div>
          </section>
        </div>

        {/* Navigation Examples */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Navigation Links</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-muted rounded-lg p-4 text-center">
              <h3 className="mb-2 font-medium">Course</h3>
              <p className="text-muted-foreground text-sm">
                Browse available courses
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <h3 className="mb-2 font-medium">Account</h3>
              <p className="text-muted-foreground text-sm">
                Manage your profile
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <h3 className="mb-2 font-medium">Review</h3>
              <p className="text-muted-foreground text-sm">
                Read and write reviews
              </p>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
