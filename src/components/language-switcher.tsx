"use client";

import { useI18n } from "@/lib/i18n-context";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { 
  DropdownMenu as Dropdown, 
  DropdownMenuContent as Content, 
  DropdownMenuItem as Item, 
  DropdownMenuTrigger as Trigger 
} from "./ui/dropdown-menu";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <Dropdown>
      <Trigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('switch_language')}</span>
        </Button>
      </Trigger>
      <Content align="end">
        <Item onClick={() => setLanguage('fr')}>
          Français {language === 'fr' && "✓"}
        </Item>
        <Item onClick={() => setLanguage('en')}>
          English {language === 'en' && "✓"}
        </Item>
        <Item onClick={() => setLanguage('es')}>
          Español {language === 'es' && "✓"}
        </Item>
      </Content>
    </Dropdown>
  );
}
