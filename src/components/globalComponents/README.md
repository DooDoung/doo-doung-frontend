# Global Components Documentation

This directory contains reusable global components for the DooDoung platform.

## Components Overview

### 🏗️ Layout Components

#### `DefaultLayout`

The main layout wrapper that provides header, main content area, and footer.

**Basic Usage:**

```tsx
import { DefaultLayout } from "@/components/globalComponents";

export default function MyPage() {
  return (
    <DefaultLayout>
      <h1>Your page content here</h1>
    </DefaultLayout>
  );
}
```

**Props:**

- `children` - Content to render in the main area
- `includeHeader` - Whether to show header (default: true)
- `includeFooter` - Whether to show footer (default: true)
- `className` - Custom CSS classes for the root container
- `contentClassName` - Custom CSS classes for the main content area
- `headerProps` - Props to pass to the Header component
- `footerProps` - Props to pass to the Footer component

#### Layout Variants

**`ContainerLayout`** - Adds container constraints and padding:

```tsx
<ContainerLayout>
  <YourContent />
</ContainerLayout>
```

**`FullWidthLayout`** - Full viewport width content:

```tsx
<FullWidthLayout>
  <YourFullWidthContent />
</FullWidthLayout>
```

**`AuthLayout`** - No header/footer, centered content:

```tsx
<AuthLayout>
  <LoginForm />
</AuthLayout>
```

### 🧭 Navigation Components

#### `Header`

Sticky header with DooDoung branding and navigation links.

**Features:**

- Responsive design (mobile + desktop)
- Brand logo/text on the left
- Navigation links: `/course`, `/account`, `/review`
- Sticky positioning with backdrop blur
- Accessible keyboard navigation

**Usage:**

```tsx
import { Header } from "@/components/globalComponents";

<Header className="custom-header-class" />;
```

#### `Footer`

Comprehensive footer with links, social media, and company info.

**Features:**

- Multi-column layout (responsive)
- Organized link sections (Platform, Account, Support)
- Social media icons
- Copyright and legal links
- Company branding and description

**Usage:**

```tsx
import { Footer } from "@/components/globalComponents";

<Footer className="custom-footer-class" />;
```

### 🎯 UI Components

#### `GlobalButton`

Enhanced button component built on shadcn/ui Button.

**Features:**

- Primary/secondary variants
- Loading states with spinner
- Icon support
- Full width option
- TypeScript support

**Usage:**

```tsx
import { GlobalButton } from "@/components/globalComponents";

<GlobalButton variant="primary" loading={isLoading}>
  Submit
</GlobalButton>;
```

## 📁 File Structure

```
src/components/globalComponents/
├── index.ts              # Barrel exports
├── DefaultLayout.tsx     # Main layout component + variants
├── Header.tsx           # Navigation header
├── Footer.tsx           # Site footer
├── component-ex.tsx     # Global button component
└── LayoutExample.tsx    # Usage examples
```

## 🎨 Styling

All components use:

- **Tailwind CSS** for styling
- **CSS variables** for theming
- **shadcn/ui design tokens**
- **Responsive design** principles
- **Dark/light mode** support

## 🔧 Customization

### Custom Header/Footer

```tsx
<DefaultLayout
  headerProps={{ className: "bg-primary" }}
  footerProps={{ className: "bg-secondary" }}
>
  <Content />
</DefaultLayout>
```

### No Header/Footer

```tsx
<DefaultLayout includeHeader={false} includeFooter={false}>
  <Content />
</DefaultLayout>
```

### Custom Content Styling

```tsx
<DefaultLayout contentClassName="bg-gray-50 p-8">
  <Content />
</DefaultLayout>
```

## 🚀 Quick Start

1. **Import the layout:**

```tsx
import { DefaultLayout } from "@/components/globalComponents";
```

2. **Wrap your page content:**

```tsx
export default function MyPage() {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1>Welcome to My Page</h1>
        <p>Your content here...</p>
      </div>
    </DefaultLayout>
  );
}
```

3. **For specific use cases:**

```tsx
// Simple page with container
<ContainerLayout>
  <MyPageContent />
</ContainerLayout>

// Full-width page
<FullWidthLayout>
  <MyFullWidthContent />
</FullWidthLayout>

// Auth page
<AuthLayout>
  <LoginForm />
</AuthLayout>
```

## 📱 Responsive Behavior

- **Mobile**: Simplified navigation, stacked footer layout
- **Tablet**: Balanced layout with readable spacing
- **Desktop**: Full layout with optimal spacing and typography

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly
- Focus management
- ARIA labels where needed

## 🔗 Navigation Links

The header includes these main navigation links:

- **Course** (`/course`) - Browse and enroll in courses
- **Account** (`/account`) - User profile and settings
- **Review** (`/review`) - Read and write course reviews

## 🎯 Best Practices

1. **Use the appropriate layout variant** for your content type
2. **Keep content semantic** and accessible
3. **Test responsive behavior** on different screen sizes
4. **Customize styling** through props rather than overriding CSS
5. **Use the barrel export** (`@/components/globalComponents`) for imports
