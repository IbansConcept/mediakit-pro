"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n-context"
import Link from "next/link"
import { Logo } from "./logo"

export function MobileMenu() {
  const { t } = useI18n()
  const [open, setOpen] = React.useState(false)

  const links = [
    { href: "#features", label: t('features') },
    { href: "/app", label: t('nav_studio') },
    { href: "mailto:info@digiprounic.com", label: t('footer_contact') },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] h-full flex flex-col p-0 border-none rounded-none left-0 translate-x-0 translate-y-0 top-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-left">
            <Logo />
          </DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col p-6 gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-semibold hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  )
}
