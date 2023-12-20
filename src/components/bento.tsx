type Props = {
    children: React.ReactNode
    className?: string
}

export const BentoBox = ({children, className}: Props) => {
    return (
        <div className={` ${className ? className : ''}`}>
            {children}
        </div>
    )
}