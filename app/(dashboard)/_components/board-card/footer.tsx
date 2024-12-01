import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BoardCardFooterProps {
    isFavorite: boolean;
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    onClick: () => void;
    disabled: boolean;
}

export const Footer = ({ isFavorite, title, authorLabel, createdAtLabel, onClick, disabled }: BoardCardFooterProps) => {
    const handleClick=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
            event.stopPropagation();
            event.preventDefault();
            onClick();
    }
    return (
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                {title}
            </p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity truncate text-[11px] text-muted-foreground">
                {authorLabel} • {createdAtLabel}
            </p>
            <button 
                onClick={handleClick}
                className={cn("opacity-0 group-hover:opacity-100 transition-opacity top-3 right-3 absolute hover:text-blue-600 text-muted-foreground", disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer")}
            >
                <Star  className={cn("w-4 h-4 ", isFavorite && "text-blue-600 fill-blue-600")} />
            </button>
        </div>
    )
};