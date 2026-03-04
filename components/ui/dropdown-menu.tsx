import * as React from "react"

const DropdownMenuContext = React.createContext<{ open: boolean; setOpen: (o: boolean) => void } | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, asChild, ...props }: React.PropsWithChildren<{ asChild?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  const ctx = React.useContext(DropdownMenuContext)
  const handleClick = () => {
    ctx?.setOpen(!ctx?.open)
  }
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e?: React.MouseEvent) => void }>
    return React.cloneElement(child, {
      onClick: (e?: React.MouseEvent) => {
        handleClick()
        child.props?.onClick?.(e)
      },
    })
  }
  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export function DropdownMenuContent({ children, className = "", align, ...rest }: { children: React.ReactNode; className?: string; align?: "start" | "center" | "end" }) {
  const ctx = React.useContext(DropdownMenuContext)
  if (!ctx?.open) return null
  return (
    <div className={`absolute right-0 z-50 mt-1 min-w-[8rem] rounded-md border border-slate-700 bg-slate-900 p-1 shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export function DropdownMenuItem({ children, className = "", ...props }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }>) {
  return (
    <button type="button" className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-800 ${className}`} {...props}>
      {children}
    </button>
  )
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
}

export function DropdownMenuSeparator({ className = "" }: { className?: string }) {
  return <div className={`-mx-1 my-1 h-px bg-slate-700 ${className}`} />
}
