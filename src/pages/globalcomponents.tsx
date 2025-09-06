import {
  AlertCircle,
  Download,
  Heart,
  Settings,
  Star,
  User,
} from "lucide-react";

import { DefaultLayout, GlobalButton } from "@/components/globalComponents";
import { GlobalInput } from "@/components/globalComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function GlobalComponentShowcase() {
  return (
    <DefaultLayout>
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Global Component Showcase</h1>
          <p className="text-muted-foreground mb-6 text-xl">
            Explore all the reusable components available in the DooDoung
            platform
          </p>
          <Badge variant="secondary" className="text-sm">
            Built with shadcn/ui + Custom Global Components
          </Badge>
        </div>

        <div className="space-y-12">
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Font Component
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="font-sanctuary text-4xl">
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="font-sanctuary text-4xl">ทดสอบภาษาไทย</p>
                <p className="font-sulphur text-4xl">
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="font-sulphur text-4xl">ทดสอบภาษาไทย</p>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-12">
          {/* Global Button Component Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Global Button Component
                </CardTitle>
                <CardDescription>
                  Enhanced button component with loading states, icons, and
                  multiple variants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary & Secondary Variants */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">
                    Default & Secondary Variants
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <GlobalButton variant="primary">
                      Default Button
                    </GlobalButton>
                    <GlobalButton variant="secondary">
                      Secondary Button
                    </GlobalButton>
                    <GlobalButton variant="primary" size="sm">
                      Small Default
                    </GlobalButton>
                    <GlobalButton variant="secondary" size="lg">
                      Large Secondary
                    </GlobalButton>
                  </div>
                </div>

                {/* Loading States */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Loading States</h4>
                  <div className="flex flex-wrap gap-3">
                    <GlobalButton variant="primary" loading>
                      Saving...
                    </GlobalButton>
                    <GlobalButton
                      variant="secondary"
                      loading
                      loadingText="Processing..."
                    >
                      Processing
                    </GlobalButton>
                  </div>
                </div>

                {/* With Icons */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">With Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <GlobalButton
                      variant="primary"
                      icon={<Download className="h-4 w-4" />}
                    >
                      Download
                    </GlobalButton>
                    <GlobalButton
                      variant="secondary"
                      icon={<Heart className="h-4 w-4" />}
                    >
                      Like
                    </GlobalButton>
                    <GlobalButton
                      variant="primary"
                      icon={<Settings className="h-4 w-4" />}
                    >
                      Settings
                    </GlobalButton>
                  </div>
                </div>

                {/* Full Width */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Full Width</h4>
                  <div className="space-y-2">
                    <GlobalButton variant="primary" fullWidth>
                      Full Width Default Button
                    </GlobalButton>
                    <GlobalButton variant="secondary" fullWidth>
                      Full Width Secondary Button
                    </GlobalButton>
                  </div>
                </div>

                {/* Other Variants */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Other Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <GlobalButton variant="ghost">Ghost</GlobalButton>
                  </div>
                </div>

                {/* Disabled States */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Disabled States</h4>
                  <div className="flex flex-wrap gap-3">
                    <GlobalButton variant="primary" disabled>
                      Disabled Default
                    </GlobalButton>
                    <GlobalButton variant="secondary" disabled>
                      Disabled Secondary
                    </GlobalButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Global Input Component Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Global Input Component
                </CardTitle>
                <CardDescription>
                  Enhanced input component with custom styling, validation
                  states, and sizing options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Sizes */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Input Sizes</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="input-sm">Small Input</Label>
                      <GlobalInput
                        id="input-sm"
                        size="sm"
                        placeholder="Small input placeholder"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="input-default">Default Input</Label>
                      <GlobalInput
                        id="input-default"
                        size="default"
                        placeholder="Default input placeholder"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="input-lg">Large Input</Label>
                      <GlobalInput
                        id="input-lg"
                        size="lg"
                        placeholder="Large input placeholder"
                      />
                    </div>
                  </div>
                </div>

                {/* Validation States */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Validation States</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="input-valid">Valid Input</Label>
                      <GlobalInput
                        id="input-valid"
                        placeholder="This input is valid"
                        isValid={true}
                        hintText="This field looks good!"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="input-invalid">Invalid Input</Label>
                      <GlobalInput
                        id="input-invalid"
                        placeholder="This input has an error"
                        isInvalid={true}
                        hintText="Please enter a valid value"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Width */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Full Width</h4>
                  <div className="space-y-1">
                    <Label htmlFor="input-fullwidth">Full Width Input</Label>
                    <GlobalInput
                      id="input-fullwidth"
                      placeholder="This input takes full width"
                      fullWidth={true}
                    />
                  </div>
                </div>

                {/* Different Input Types */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Input Types</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="input-email">Email</Label>
                      <GlobalInput
                        id="input-email"
                        type="email"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="input-password">Password</Label>
                      <GlobalInput
                        id="input-password"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="input-number">Number</Label>
                      <GlobalInput
                        id="input-number"
                        type="number"
                        placeholder="123"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="input-tel">Phone</Label>
                      <GlobalInput
                        id="input-tel"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Disabled State */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Disabled State</h4>
                  <div className="space-y-1">
                    <Label htmlFor="input-disabled">Disabled Input</Label>
                    <GlobalInput
                      id="input-disabled"
                      placeholder="This input is disabled"
                      disabled={true}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Global Select Component Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Global Select Component
                </CardTitle>
                <CardDescription>
                  Enhanced select component with custom styling, states, and
                  sizing options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select your pokemon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Bulbasaur</SelectItem>
                    <SelectItem value="2">Ivysaur</SelectItem>
                    <SelectItem value="3">Venusaur</SelectItem>
                    <SelectItem value="4">Charmander</SelectItem>
                    <SelectItem value="5">Charmeleon</SelectItem>
                    <SelectItem value="6">Charizard</SelectItem>
                    <SelectItem value="7">Squirtle</SelectItem>
                    <SelectItem value="8">Wartortle</SelectItem>
                    <SelectItem value="9">Blastoise</SelectItem>
                    <SelectItem value="10">Caterpie</SelectItem>
                    <SelectItem value="11">Metapod</SelectItem>
                    <SelectItem value="12">Butterfree</SelectItem>
                    <SelectItem value="13">Weedle</SelectItem>
                    <SelectItem value="14">Kakuna</SelectItem>
                    <SelectItem value="15">Beedrill</SelectItem>
                    <SelectItem value="16">Pidgey</SelectItem>
                    <SelectItem value="17">Pidgeotto</SelectItem>
                    <SelectItem value="18">Pidgeot</SelectItem>
                    <SelectItem value="19">Rattata</SelectItem>
                    <SelectItem value="20">Raticate</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </section>

          {/* Shadcn/ui Components Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Shadcn/ui Components
                </CardTitle>
                <CardDescription>
                  Core UI components from shadcn/ui library
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Standard Buttons */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Standard Buttons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                {/* Form Components */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Form Components</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Type your message here..."
                      />
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                {/* Switch */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Switch</h4>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Layout Showcase */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Layout Components</CardTitle>
                <CardDescription>
                  Different layout options available for pages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">DefaultLayout</CardTitle>
                      <CardDescription>
                        Standard layout with header and footer
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <code className="bg-muted block rounded p-2 text-sm">
                        &lt;DefaultLayout&gt;...&lt;/DefaultLayout&gt;
                      </code>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">ContainerLayout</CardTitle>
                      <CardDescription>
                        Layout with automatic container constraints
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <code className="bg-muted block rounded p-2 text-sm">
                        &lt;ContainerLayout&gt;...&lt;/ContainerLayout&gt;
                      </code>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">FullWidthLayout</CardTitle>
                      <CardDescription>
                        Full viewport width layout
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <code className="bg-muted block rounded p-2 text-sm">
                        &lt;FullWidthLayout&gt;...&lt;/FullWidthLayout&gt;
                      </code>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AuthLayout</CardTitle>
                      <CardDescription>
                        Centered layout for authentication pages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <code className="bg-muted block rounded p-2 text-sm">
                        &lt;AuthLayout&gt;...&lt;/AuthLayout&gt;
                      </code>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Usage Examples */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Usage Examples</CardTitle>
                <CardDescription>
                  Code examples for importing and using components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">
                    Import Global Components
                  </h4>
                  <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                    {`import { 
  DefaultLayout, 
  GlobalButton,
  GlobalInput, 
  Header, 
  Footer 
} from "@/components/globalComponents"`}
                  </pre>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">
                    Import UI Components
                  </h4>
                  <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                    {`import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents";`}
                  </pre>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Example Usage</h4>
                  <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                    {`<DefaultLayout>
  <div className="container mx-auto p-4">
    <Label htmlFor="email">Email</Label>
    <GlobalInput
      placeholder="Enter your email"
      type="email"
      isValid={isValid}
      hintText="Email looks good!"
    />
    <GlobalButton 
      variant="primary" 
      icon={<Star />}
      loading={isLoading}
    >
      Save Changes
    </GlobalButton>

    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select your pokemon" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Bulbasaur</SelectItem>
        <SelectItem value="2">Ivysaur</SelectItem>
      </SelectContent>
    </Select>
  </div>
</DefaultLayout>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Component Status */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Component Status</CardTitle>
                <CardDescription>
                  Overview of available components and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "GlobalButton",
                      status: "Ready",
                      variant: "default",
                    },
                    {
                      name: "GlobalInput",
                      status: "Ready",
                      variant: "default",
                    },
                    { name: "Header", status: "Ready", variant: "default" },
                    { name: "Footer", status: "Ready", variant: "default" },
                    {
                      name: "DefaultLayout",
                      status: "Ready",
                      variant: "default",
                    },
                    {
                      name: "ContainerLayout",
                      status: "Ready",
                      variant: "default",
                    },
                    {
                      name: "FullWidthLayout",
                      status: "Ready",
                      variant: "default",
                    },
                    { name: "AuthLayout", status: "Ready", variant: "default" },
                    {
                      name: "Button (shadcn)",
                      status: "Ready",
                      variant: "secondary",
                    },
                    {
                      name: "Input (shadcn)",
                      status: "Ready",
                      variant: "secondary",
                    },
                    {
                      name: "Card (shadcn)",
                      status: "Ready",
                      variant: "secondary",
                    },
                    {
                      name: "Badge (shadcn)",
                      status: "Ready",
                      variant: "secondary",
                    },
                    {
                      name: "Alert (shadcn)",
                      status: "Ready",
                      variant: "secondary",
                    },
                  ].map((component) => (
                    <div
                      key={component.name}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <span className="font-medium">{component.name}</span>
                      <Badge variant={component.variant as any}>
                        {component.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Footer Note */}
        <div className="bg-muted/30 mt-12 rounded-lg p-6 text-center">
          <p className="text-muted-foreground">
            This showcase demonstrates all available global components in the
            DooDoung platform. For more detailed documentation, check the
            component README files.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
