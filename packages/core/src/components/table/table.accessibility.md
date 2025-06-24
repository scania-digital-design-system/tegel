# Table Component Accessibility

## Overview
The Table component is designed to be fully accessible, following WCAG 2.1 guidelines and ARIA best practices. It provides comprehensive keyboard navigation, screen reader support, and proper semantic structure.

## Accessibility Features

### Keyboard Navigation
- **Tab Navigation**: Users can tab through interactive elements in the table
- **Arrow Keys**: Navigate between cells in the table
- **Space/Enter**: Activate clickable rows or interactive elements
- **Ctrl/Cmd + Space**: Select/deselect rows in multiselect mode
- **Escape**: Close expanded rows or dropdowns

### Screen Reader Support
- Proper table structure with `<table>`, `<thead>`, `<tbody>`, and `<tr>` elements
- ARIA roles and attributes for enhanced screen reader experience
- Dynamic content updates announced through ARIA live regions
- Clear and descriptive labels for all interactive elements

### Color and Contrast
- All text meets WCAG 2.1 AA standards for color contrast
- Zebra striping patterns maintain sufficient contrast
- Interactive elements have clear focus indicators
- Status indicators (selected, expanded, etc.) are visually distinct

## Required Props

### Essential Accessibility Props
- `tableId`: Required for proper event handling and component identification
- `tdsAriaLabel`: Required for table toolbar search functionality

### Optional Accessibility Props
- `compactDesign`: Affects touch target sizes, consider accessibility implications
- `verticalDividers`: Visual enhancement that doesn't affect accessibility
- `zebraMode`: Visual enhancement that must maintain sufficient contrast

## Best Practices

### Implementation
1. Always provide meaningful header text
2. Use appropriate ARIA labels for interactive elements
3. Maintain proper heading hierarchy
4. Ensure sufficient color contrast for all text
5. Test with screen readers and keyboard navigation

### Common Pitfalls
1. Missing or unclear header text
2. Insufficient color contrast in custom cell content
3. Complex interactions without proper ARIA announcements
4. Missing keyboard navigation support for custom features

## Testing
The table component has been tested with:
- Screen readers (NVDA, VoiceOver, JAWS)
- Keyboard navigation
- Color contrast checkers
- Automated accessibility testing tools

## Known Limitations
- Complex sorting and filtering operations should be implemented with proper ARIA live regions
- Custom cell content should maintain proper contrast ratios
- Dynamic content updates should be announced to screen readers

## Resources
- [WAI-ARIA Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [Tegel Design System Accessibility Guidelines](../docs/accessibility.md) 