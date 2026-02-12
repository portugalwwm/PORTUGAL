const SHEET_URL = "https://docs.google.com/spreadsheets/d/116Qoa8HD_iOYKIw61rdX0D6wkaoNU0cFsBAPEOGEO5U/export?format=csv";

async function carregarPerfil() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("perfil-content").innerHTML = "<p>Membro não encontrado.</p>";
        return;
    }

    const response = await fetch(SHEET_URL);
    const text = await response.text();

    const rows = text.split("\n").slice(1);

    const members = rows.map(row => {
        const cols = row.split(",");
        return {
            id: cols[0],
            nome: cols[1],
            rank: cols[2],
            classe: cols[3],
            arma: cols[4],
            build: cols[5],
            score: cols[6]
        };
    });

    const membro = members.find(m => m.id === id);

    if (!membro) {
        document.getElementById("perfil-content").innerHTML = "<p>Membro não encontrado.</p>";
        return;
    }

    document.getElementById("perfil-content").innerHTML = `
        <div class="perfil-card">
            <h2>${membro.nome}</h2>
            <p><strong>Rank:</strong> ${membro.rank}</p>
            <p><strong>Classe:</strong> ${membro.classe}</p>
            <p><strong>Arma:</strong> ${membro.arma}</p>
            <p><strong>Build:</strong> ${membro.build}</p>
            <p><strong>Score:</strong> ${membro.score}</p>
        </div>
    `;
}

carregarPerfil();

