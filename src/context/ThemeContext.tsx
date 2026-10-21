import {
    createContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { themes } from './themes';

type ThemeContextType = {
    theme: string | null;
    setTheme: (name: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: null,
    setTheme: () => { }
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const applyCssVariable = (property: string, value: string) => {
        document.documentElement.style.setProperty(property, value);
    };

    const hexToRgb = (hex: string): string => {
        const sanitizedHex = hex.replace('#', '');
        const expandedHex = sanitizedHex.length === 3
            ? sanitizedHex.split('').map((char) => `${char}${char}`).join('')
            : sanitizedHex;

        const parsedValue = Number.parseInt(expandedHex, 16);
        const red = (parsedValue >> 16) & 255;
        const green = (parsedValue >> 8) & 255;
        const blue = parsedValue & 255;

        return `${red}, ${green}, ${blue}`;
    };

    // inicializa direto com localStorage (sem esperar useEffect)
    const getInitialTheme = (): string => {
        const saved = localStorage.getItem("theme");
        if (saved && themes[saved]) {
            return saved;
        }
        return "blue"; // fallback se não tiver nada salvo
    };

    const [theme, setTheme] = useState<string>(getInitialTheme);

    // busca do backend e sobrescreve se necessário
    useEffect(() => {
        const fetchTheme = async () => {
            try {
                setTheme('blue'); // tema padrão enquanto carrega
                // const baseUrl = window.location.hostname.includes("webcontrol.test")
                //   ? "https://webcontrol.test/webcontrol"
                //   : "https://webcontrolempresas.com.br/webcontrol";

                // const response = await fetch(`${baseUrl}/apoio/novo_inicio/CoresSistema.php`, {
                //   credentials: "include",
                // });
                // const data = await response.json();

                // if (Array.isArray(data) && data.length > 0) {
                //   const tema = data[0].cor_sistema;
                //   if (tema && themes[tema]) {
                //     setTheme(tema); // aqui sobrescreve se veio outro
                //   }
                // }
            } catch (err) {
                setTheme("blue"); // fallback em caso de erro
            }
        };

        fetchTheme();
    }, []);

    // aplica o tema selecionado no CSS root
    useEffect(() => {
        const selected = themes[theme];
        if (selected) {
            Object.entries(selected).forEach(([key, value]) => {
                applyCssVariable(`--color-${key}`, value);
            });

            applyCssVariable('--bs-primary', selected.main);
            applyCssVariable('--bs-primary-rgb', hexToRgb(selected.main));
            applyCssVariable('--bs-secondary', selected.secondary);
            applyCssVariable('--bs-secondary-rgb', hexToRgb(selected.secondary));
            applyCssVariable('--bs-tertiary', selected.tertiary);
            applyCssVariable('--bs-tertiary-color', selected.tertiary);
            applyCssVariable('--bs-tertiary-rgb', hexToRgb(selected.tertiary));
            applyCssVariable('--bs-light-bg-subtle', selected.quaternary);
            applyCssVariable('--bs-light-rgb', hexToRgb(selected.quaternary));
            applyCssVariable('--bs-body-color', selected.secondary);
            applyCssVariable('--bs-body-color-rgb', hexToRgb(selected.secondary));
            applyCssVariable('--bs-body-bg', '#ffffff');
            applyCssVariable('--bs-body-bg-rgb', '255, 255, 255');
            applyCssVariable('--bs-link-color', selected.main);
            applyCssVariable('--bs-link-hover-color', selected.secondary);
            applyCssVariable('--bs-emphasis-color', selected.secondary);
            applyCssVariable('--bs-border-color', selected.quaternary);
            applyCssVariable('--theme-surface', '#ffffff');
            applyCssVariable('--theme-surface-soft', `${selected.quaternary}33`);
            applyCssVariable('--theme-surface-muted', `${selected.quaternary}1A`);
            applyCssVariable('--theme-border', `${selected.secondary}26`);
            applyCssVariable('--theme-text', selected.secondary);
            applyCssVariable('--theme-text-soft', `${selected.secondary}CC`);
            applyCssVariable('--theme-overlay', 'rgba(15, 23, 42, 0.25)');

            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
