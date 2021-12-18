
export const routes = [
    {
        path: '/',
        componentName: "Home",
    },
    {
        path: '/users',
        componentName: "Users",
    },
    {
        path: '/user',
        componentName: 'User',
        children: [
            {
              path: ":userId",
              componentName: "User",
            }
        ]
    },
    {
        path: '/teams',
        componentName: 'Teams',
    },
    {
        path: '/team',
        componentName: 'Team',
        children: [
            {
              path: ":teamId",
              componentName: "Team",
            }
        ]
    },
];