import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { FontawesomeModule } from '../../shared/fontawesome.module';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface MenuItem {
  name: string;
  route: string;
  icon: IconProp;
}

interface MenuSection {
  title: string;
  expanded: boolean;
  items: MenuItem[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FontawesomeModule, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = true;
  isSidebarMinimized = false;
  currentPath: string = '/';
  currentPageTitle: string = 'Knowledge Hub';
  notificationCount: number = 8;
  
  // Menu sections for the sidebar navigation
  menuSections: MenuSection[] = [
    {
      title: 'Portfolios',
      expanded: true,
      items: [
        { name: 'Forecasting', route: '/forecasting', icon: 'newspaper' },
        { name: 'Treasury', route: '/treasury', icon: 'newspaper' },
        { name: 'Hedge Accounting', route: '/hedge', icon: 'newspaper' },
        { name: 'MRP', route: '/mrp', icon: 'newspaper' },
        { name: 'ESR', route: '/esr', icon: 'newspaper' },
        { name: 'FP&A', route: '/fpa', icon: 'newspaper' }
      ]
    },
    {
      title: 'AI Content',
      expanded: false,
      items: [
        { name: 'Prompt Library', route: '/prompts', icon: 'newspaper' },
        { name: 'Videos', route: '/videos', icon: 'video' },
      ]
    },
    // {
    //   title: 'Knowledge Base',
    //   expanded: false,
    //   items: [
    //     { name: 'Documentation', route: '/documentation', icon: 'file-alt' },
    //     { name: 'Best Practices', route: '/best-practices', icon: 'award' },
    //     { name: 'FAQs', route: '/faqs', icon: 'question-circle' }
    //   ]
    // }
    
    
  ];
  
  // Static section expanded states
  expandedSections = {
    knowledgeHub: true,
    contentLibrary: false,
    knowledgeBase: false,
    community: false,
    myContributions: false
  };

  constructor(private router: Router) {}
  
  ngOnInit() {
    // Track current route for active menu highlighting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.url;
      this.updatePageTitle(event.url);
    });
    
    // Set initial page title based on current URL
    this.updatePageTitle(this.router.url);
  }

  // Toggle a menu section's expanded state
  toggleMenuSection(section: MenuSection): void {
    section.expanded = !section.expanded;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (!this.isSidebarOpen) {
      this.isSidebarMinimized = false;
    }
  }
  
  toggleSidebarMinimize(): void {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
  
  // Toggle specific static section
  toggleStaticSection(section: string): void {
    // Check if property exists in expandedSections
    if (section in this.expandedSections) {
      // If collapsing current expanded section, just toggle it
      if (this.expandedSections[section as keyof typeof this.expandedSections]) {
        this.expandedSections[section as keyof typeof this.expandedSections] = false;
      } else {
        // Otherwise, collapse all sections first
        Object.keys(this.expandedSections).forEach(key => {
          this.expandedSections[key as keyof typeof this.expandedSections] = false;
        });
        // Then expand only the clicked section
        this.expandedSections[section as keyof typeof this.expandedSections] = true;
      }
    }
  }
  
  // Check if a section is expanded
  isExpanded(section: string): boolean {
    return this.expandedSections[section as keyof typeof this.expandedSections];
  }
  
  // Update page title based on current route
  updatePageTitle(url: string): void {
    if (url === '/' || url === '/dashboard') {
      this.currentPageTitle = 'Dashboard';
    } else if (url === '/prompts') {
      this.currentPageTitle = 'Prompts';
    } else if (url === '/videos') {
      this.currentPageTitle = 'Videos';
    }
  }
}
