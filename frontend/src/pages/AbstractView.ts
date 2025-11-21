export abstract class AbstractView {
    public abstract render(container: HTMLElement): Promise<void>;
    
    protected setTitle(title: string): void {
        document.title = `${title} - ft_transcendence`;
    }
}
