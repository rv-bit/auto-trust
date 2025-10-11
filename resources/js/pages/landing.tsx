import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

import { dashboard, login, register } from '@/routes';

import { type SharedData } from '@/types';
import { RouteDefinition } from '@/wayfinder';

import Footer from '@/components/application/app-footer';
import { AppShell } from '@/components/application/app-shell';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    // trick the theme to force white mode under all divs
    React.useEffect(() => {
        document.body.classList.add('landing');
        return () => {
            document.body.classList.remove('landing');
        };
    }, []);

    const actions: {
        title: string;
        href?: RouteDefinition<'get'>;
        component?: React.FC;
        className?: string;
        isHidden?: boolean;
    }[] = React.useMemo(
        () => [
            {
                title: 'Dashboard',
                href: dashboard(),
                className:
                    'inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]',
                isHidden: auth.user === null,
            },
            {
                title: 'Sign In',
                href: login(),
                className:
                    'inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035]',
                isHidden: auth.user !== null,
            },
            {
                title: 'Create an Account',
                href: register(),
                className:
                    'inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]',
                isHidden: auth.user !== null,
            },
        ],
        [auth],
    );

    return (
        <AppShell
            variant="header"
            className="relative flex justify-start text-black"
        >
            <Head title="Welcome"></Head>
            <header
                style={{
                    height: 'var(--header-h)',
                    width: '100%',
                    position: 'fixed',
                }}
                className="z-20 border-b border-border bg-off-background text-sm not-has-[nav]:hidden lg:px-8"
            >
                <nav className="flex items-center justify-end gap-4">
                    {actions.map(
                        (action) =>
                            !action.isHidden &&
                            (action.component ? (
                                <action.component />
                            ) : (
                                action.href && (
                                    <Link
                                        key={action.title}
                                        href={dashboard()}
                                        className={action.className ?? ''}
                                    >
                                        {action.title}
                                    </Link>
                                )
                            )),
                    )}
                </nav>
            </header>
            <div className="z-0 flex flex-col justify-start px-6 pt-4 lg:px-8 lg:pt-4">
                <main
                    style={{
                        minHeight: '100%',
                        width: '100%',
                        paddingTop: 'var(--header-h)',
                    }}
                    className="flex flex-col items-center justify-center"
                >
                    <h1>Hi</h1>
                </main>

                <Footer />
            </div>
        </AppShell>
    );
}
