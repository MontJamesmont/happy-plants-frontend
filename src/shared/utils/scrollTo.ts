export function scrollToSection(id: string, headerOffset = 72): void {
  const el = document.getElementById(id)
  if (!el) return
  const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerOffset
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}
