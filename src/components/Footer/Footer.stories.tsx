import * as React from "react";
import { storiesOf } from "@storybook/react";
import { FooterItem, MainLayout, Footer, CenterLayout, FooterItems } from "..";

export const footerItems: FooterItem[] = [
    {
        label: "© 2018 Utdanningsdirektoratet. Alle rettigheter forbeholdt."
    },
    {
        label: "Versjon 0.0.35"
    },
    {
        label: "Personvern",
        onClickItem: () => console.log("test")
    },
    {
        label: "Kontakt",
        onClickItem: () => console.log("test")
    }
];

storiesOf("Footer", module).add("Footer with content", () => (
    <MainLayout>
        <Footer>
            <CenterLayout>
                <FooterItems items={footerItems} />
            </CenterLayout>
        </Footer>
    </MainLayout>
));
