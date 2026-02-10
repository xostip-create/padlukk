
export default function WorldPage() {
  return (
    <div className="bg-background text-foreground font-body">
      <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4 space-y-16">

        {/* 1. Opening Context */}
        <section className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl mb-6">Padluckk World</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            This is not a platform; it is a world. A space where culture is lived, shared, and shaped over time—through people, scenes, and the spaces in between.
          </p>
        </section>

        {/* 2. The Elements of the World */}
        <section className="space-y-12">
          <div>
            <h2 className="font-headline text-3xl mb-3">Music & DJ Culture</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Sounds from the underground, broadcast from basements and warehouses. The DJs, collectors, and labels building the communities that define our nights.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-3xl mb-3">Fashion & Boutiques</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              The independent designers and curated spaces shaping our visual language. Garments as artifacts, boutiques as galleries.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-3xl mb-3">Creative Practice</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Behind the finished work lies the process. The studios, the tools, the discipline, and the quiet moments of inspiration that drive creators forward.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-3xl mb-3">Ideas & Dialogue</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Conversations that move culture. The zines, the roundtables, and the late-night debates that challenge assumptions and propose new ways of seeing.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-3xl mb-3">Community & Connection</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Culture is communal. It is the shared experience of a record, a look, a conversation. The connections that turn individual moments into a collective memory.
            </p>
          </div>
        </section>

        {/* 3. How the World Grows */}
        <section className="text-center border-t pt-12">
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This world grows organically. Through the people who inhabit it, the events that gather them, and the collaborations that emerge. Stories will appear when they are ready to be told. We are starting quietly, with intention.
          </p>
        </section>

      </div>
    </div>
  );
}
