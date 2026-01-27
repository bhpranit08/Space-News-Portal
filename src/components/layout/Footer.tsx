import { Rocket, Github, Mail, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        explore: [
            { name: 'Picture of the Day', href: '/apod' },
            { name: 'Mars Rovers', href: '/mars-rovers' },
            { name: 'Asteroids', href: '/asteroids' },
            { name: 'Gallery', href: '/gallery' }
        ],
        resources: [
            { name: 'NASA Official Site', href: 'https://www.nasa.gov', external: true },
            { name: 'NASA API Docs', href: 'https://api.nasa.gov', external: true },
            { name: 'About This Project', href: '/about' },
            { name: 'Contact', href: '/contact' }
        ],
        social: [
            { name: 'GitHub', icon: Github, href: 'https://github.com/bhpranit08' },
            { name: 'Email', icon: Mail, href: 'mailto:pranitbhandari2019@gmail.com' }
        ]
    };

    return (
        <footer className="bg-background border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Rocket className="w-6 h-6" />
                            <h3 className="text-lg font-bold">Space News Portal</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Exploring the cosmos through NASA's incredible data and imagery. 
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-2">
                            {footerLinks.explore.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                    >
                                        {link.name}
                                        {link.external && <ExternalLink className="w-3 h-3" />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            {footerLinks.social.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                        <p className="text-sm text-muted-foreground mt-6">
                            Have questions or feedback? We'd love to hear from you!
                        </p>
                    </div>
                </div>

                <Separator className="mb-8" />

                <p className="text-xs text-center text-muted-foreground mt-6">
                    © {currentYear} Space News Portal. Built with data from NASA's Open APIs by Pranit Bhandari.
                </p>
            </div>
        </footer>
    );
};

export default Footer;