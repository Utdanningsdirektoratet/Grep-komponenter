import * as React from "react";
import { storiesOf } from "@storybook/react";
import GDPR from "./GDPR";

export const renderGDPRText = () => (
    <React.Fragment>
        <h4>
            Utdanningsdirektoratet er ansvarlig for å behandle dine
            personopplysninger på en sikker måte etter den nye
            personvernforordningen (GDPR) som trådte i kraft i juli 2018.
        </h4>

        <h4>Hvilke opplysninger lagrer vi om deg?</h4>

        <p>
            Vi lagrer navn, epostadresse og telefonnummer i dette systemet
            ("læreplanutvikleren"). Vi knytter også en rolle til din bruker (for
            eksempel "gruppemedlem"), samt din tilhørighet til læreplangrupper.
            Underveis i arbeidet med læreplaner vil også din bruker knyttes til
            dine kommentarer og innholdet du produserer.
        </p>
        <p>
            Ved opprettelse av deg som bruker i systemet gjør vi oppslag mot
            Utdanningsdirektoratets påloggingsløsning ("påloggingsløsningen") på
            ditt personnummer, men vi lagrer ikke personnummeret ditt i
            læreplanutvikleren.
        </p>

        <h4>
            Hvorfor trenger vi disse opplysningene og hva er det rettslige
            grunnlaget for behandlingen?
        </h4>

        <p>
            Læreplanutvikleren brukes til utvikling av læreplaner for fag i
            grunnopplæringen. Systemet tilbyr et grensesnitt som
            læreplanforfattere kan bruke for å utforme læreplaner sammen.
            Systemet muliggjør utvikling og overlevering av læreplangruppenes
            utkast til direktoratet i digitalt format. Behovet for
            personopplysninger er å kunne identifisere læreplanforfattere for
            innlogging til systemet og knytte forfatterne til deres bidrag
            underveis i utvikling av utkastet.
        </p>
        <p>
            Personnummer benyttes bare ved opprettelse av deg som bruker i
            systemet, for å være sikker på at vi registrerer riktig person.
        </p>
        <p>
            For behandling av disse opplysningene anvendes GDPR art. 6 nr. 1
            bokstav e. Supplerende rettslig grunnlag (nasjonal hjemmel) er "
            <i>
                Oppdragsbrev 03-17 Fagfornyelse og Oppfølging av Meld. St. 28
                (2015-2016) Fag - Forypning - Forståelse Stortingets
                anmodningsvedtak i innstilling 19 S (2016-2017) og Strategi for
                fagfornyelsen - Udir 2017/1677
            </i>
            " (Vår referanse 2018/10769).
        </p>

        <h4>
            Hvordan behandler vi opplysningene, og hvor lenge blir de lagret?
        </h4>

        <p>
            Navn, epost og telefonnummer får vi fra påloggingsløsningen.
            Opplysningene lagres i læreplanutviklerens egen database, og
            benyttes kun til oppgavene beskrevet i punktet over. De utveksles
            ikke med andre systemer, verken hos Utdanningsdirektoratet eller
            andre.
        </p>
        <p>
            Når læreplanene sendes videre til Grep eller høringsverktøyet vårt,
            vil det være uten personopplysninger, og uten kobling mot dine
            personopplysninger.
        </p>
        <p>
            Når ditt arbeid med læreplanen(e) er ferdig og læreplanene du har
            jobbet med er fastsatt, vil vi fjerne din bruker fra
            læreplanutvikleren. Da slettes alle dine personopplysninger fra
            systemet. Alle kommentarene dine og andre endringer vil bli
            anonymisert. Dersom du da ikke har andre roller/oppgaver hos
            direktoratet, vil også brukeren din i påloggingsløsningen fjernes
            innen 48 timer.
        </p>

        <h4>Hvem har tilgang til disse opplysningene?</h4>

        <p>
            De andre brukerne av læreplanutvikleren vil se ditt navn knyttet til
            læreplangrupper og læreplaner, innhold du har skrevet og kommentarer
            du har lagt inn. De personene som forvalter og drifter systemet vil
            ha tilgang til disse opplysningene, det samme vil utviklerne som
            jobber med løsningen. Eksterne utviklere er bundet av
            taushetserklæringer og databehandleravtaler.
        </p>

        <h4>Hvor kan du henvende deg?</h4>

        <p>
            <i>Behandlingsansvarlig:</i>
        </p>
        <p>
            Direktoratet, representert ved Per Kristian Larsen-Evjen, kan
            kontaktes ved å sende post til:
        </p>
        <p>
            Utdanningsdirektoratet
            <br />
            Postboks 9359 Grønland
            <br />
            0135 Oslo
        </p>
        <p>
            <i>Personvernombud:</i>
        </p>
        <p>
            Du kan ta kontakt med personvernombudet i Udir om vår behandling av
            personopplysninger, og da i hovedsak knyttet til personopplysninger
            om deg. Det kan være spørsmål om rettigheter, typisk innsyn i egne
            personopplysninger behandlet av Udir. Dersom du skal sende en
            henvendelse til personvernombudet vårt, kan du sende post til
            direktoratet:
        </p>
        <p>
            Utdanningsdirektoratet
            <br />
            Postboks 9359 Grønland
            <br />
            0135 Oslo
        </p>
        <p>Merk konvolutten "Udirs personvernombud"</p>
        <p>
            Du kan kontakte personvernombudet på e-post{" "}
            <a href={`mailto:personvernombud@udir.no`}>
                {" "}
                personvernombud@udir.no{" "}
            </a>
            <br />
            Personvernombudet er også tilgjengelig på telefon: 23 30 12 08 | 995
            69 717
        </p>
        <p>
            <i>Klage:</i>
        </p>
        <p>
            Datatilsynet er klageinstans, og kan kontaktes på epost eller
            telefon:
        </p>
        <p>
            <a
                href={`https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/`}
            >
                https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/
            </a>
        </p>
    </React.Fragment>
);

storiesOf("GDPR", module).add("standard", () => (
    <GDPR>{renderGDPRText()}</GDPR>
));
