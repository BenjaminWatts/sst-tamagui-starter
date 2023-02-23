
export const exchangeToken = async(options: {
    token: string;
    redirect: string
}) => window.location.replace(`/api/login?token=${options.token}&redirect=${options.redirect}`)

export const logout = () => window.location.replace('/api/logout')