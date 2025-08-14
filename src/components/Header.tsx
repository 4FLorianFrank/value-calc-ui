import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  return (
    <header className="w-full bg-surface shadow-soft border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Value Calculator
        </h1>
        
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};