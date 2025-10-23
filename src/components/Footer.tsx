import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-4 sm:py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © 2025 Motlee Organic Nexus. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>Built by</span>
            <a
              href="https://www.lunexweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Lunexweb
              <ExternalLink className="w-3 h-3 sm:w-3 sm:h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
