import { SpinnerMessage } from "@/components/stocks/message";
import { ResetIcon, SymbolIcon } from "@radix-ui/react-icons";

export default function Loading() {
    return <div className="size-full flex items-center justify-center animate-spin"><SymbolIcon width={20} height={20}/></div>;
}