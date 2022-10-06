const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/',
          icon: 'feather icon-home',
        }
      ]
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'projects',
          title: 'Projects',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            
            {
              id: 'all-projects',
              title: 'All Projects',
              type: 'item',
              url: '/projects'
            },
            {
              id: 'my-projects',
              title: 'My Projects',
              type: 'item',
              url: '#'
            },
            {
              id: 'add-project',
              title: 'Add Project',
              type: 'item',
              url: '/projects/new'
            },
            {
              id: 'manage-tickets',
              title: 'Manage Projects',
              type: 'item',
              url: '#'
          },
            {
              id: 'project-archive',
              title: 'Project Archive',
              type: 'item',
              url: '#'
            },
          ]
        }
      ],
      
    },
    {
      id: 'tickets',
      title: 'TICKETS',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'tickets',
          title: 'Tickets',
          type: 'collapse',
          icon: 'feather icon-file-text',
          children: [
            
            {
              id: 'all-tickets',
              title: 'All Tickets',
              type: 'item',
              url: '/tickets'
            },
            {
              id: 'my-ticket',
              title: 'My Tickets',
              type: 'item',
              url: '#'
            },
            {
              id: 'add-tickets',
              title: 'Add Tickets',
              type: 'item',
              url: '/tickets/new'
            },
            {
              id: 'assign-tickets',
              title: 'Assign Tickets',
              type: 'item',
              url: '#'
            },
            {
              id: 'tickets-archive',
              title: 'Tickets Archive',
              type: 'item',
              url: '#'
            },
          ]
        }
      ]
    },
    {
      id: 'admin',
      title: 'ADMIN',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'admin',
          title: 'Admin',
          type: 'collapse',
          icon: 'feather icon-server',
          children: [
            {
              id: 'manage-roles',
              title: 'Manage Roles',
              type: 'item',
              url: '#'
            },
            {
              id: 'assign-tickets',
              title: 'Assign Tickets',
              type: 'item',
              url: '#'
            },
            {
              id: 'member profiles',
              title: 'Member Profiles',
              type: 'item',
              url: '/users'
          },{
            id: 'assign-project-manager',
            title: 'Assign Project Manager',
            type: 'item',
            url: '#'
          },
          {
            id: 'add-users',
            title: 'Add Users',
            type: 'item',
            url: '/users/new'
          },
            {
              id: 'bug-tracker-api',
              title: 'Bug Tracker Api',
              type: 'item',
              url: 'https://ja-bug-tracker.herokuapp.com/',
              target: true,
              external: true
            },
          ]
        }
      ]
    },






    // {
    //   id: 'forms-tables',
    //   title: 'Forms & Tables',
    //   type: 'group',
    //   icon: 'icon-group',
    //   children: [
    //     {
    //       id: 'forms',
    //       title: 'Form Elements',
    //       type: 'item',
    //       url: '/forms/form-basic',
    //       icon: 'feather icon-file-text',
    //     },
    //     {
    //       id: 'tables',
    //       title: 'Table',
    //       type: 'item',
    //       url: '/tables/bootstrap',
    //       icon: 'feather icon-server',
    //     }
    //   ]
    // },
    // {
    //   id: 'chart-maps',
    //   title: 'Chart & Maps',
    //   type: 'group',
    //   icon: 'icon-charts',
    //   children: [
    //     {
    //       id: 'charts',
    //       title: 'Charts',
    //       type: 'item',
    //       url: '/charts/nvd3',
    //       icon: 'feather icon-pie-chart'
    //     },
    //     {
    //       id: 'maps',
    //       title: 'Map',
    //       type: 'item',
    //       url: '/maps/google-map',
    //       icon: 'feather icon-map'
    //     }
    //   ]
    // },
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'auth',
    //       title: 'Authentication',
    //       type: 'collapse',
    //       icon: 'feather icon-lock',
    //       badge: {
    //         title: 'New',
    //         type: 'label-danger'
    //     },
    //       children: [
    //         {
    //           id: 'signup-1',
    //           title: 'Sign up',
    //           type: 'item',
    //           url: '/auth/signup-1',
    //           target: true,
    //           breadcrumbs: false
    //         },
            
    //         {
    //           id: 'signin-1',
    //           title: 'Sign in',
    //           type: 'item',
    //           url: '/auth/signin-1',
    //           target: true,
    //           breadcrumbs: false
    //         }
    //       ]
    //     },
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar'
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       icon: 'feather icon-help-circle',
    //       classes: 'nav-item',
    //       url: 'https://codedthemes.com/item/datta-able-react-free-admin-template/#',
    //       target: true,
    //       external: true
    //     },
    //     {
    //       id: 'menu-level',
    //       title: 'Menu Levels',
    //       type: 'collapse',
    //       icon: 'feather icon-menu',
    //       children: [
    //         {
    //           id: 'menu-level-1.1',
    //           title: 'Menu Level 1.1',
    //           type: 'item',
    //           url: '#!'
    //         },
    //         {
    //           id: 'menu-level-1.2',
    //           title: 'Menu Level 2.2',
    //           type: 'collapse',
    //           children: [
    //             {
    //               id: 'menu-level-2.1',
    //               title: 'Menu Level 2.1',
    //               type: 'item',
    //               url: '#'
    //             },
    //             {
    //               id: 'menu-level-2.2',
    //               title: 'Menu Level 2.2',
    //               type: 'collapse',
    //               children: [
    //                 {
    //                   id: 'menu-level-3.1',
    //                   title: 'Menu Level 3.1',
    //                   type: 'item',
    //                   url: '#'
    //                 },
    //                 {
    //                   id: 'menu-level-3.2',
    //                   title: 'Menu Level 3.2',
    //                   type: 'item',
    //                   url: '#'
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       classes: 'nav-item disabled',
    //       icon: 'feather icon-power'
    //     }
    //   ]
    // }
  ]
};

export default menuItems;
