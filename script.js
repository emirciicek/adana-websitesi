document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const imageSources = [
    "https://image.cnnturk.com/i/cnnturk/75/1200x675/60e78e5879da3e183c22f57f.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/06/b4/b6/adana-merkez-camii.jpg?w=2000&h=800&s=1",
    "https://media.istockphoto.com/id/1066802894/tr/foto%C4%9Fraf/stone-bridge-ve-sabanc%C4%B1-merkez-camii-adana-t%C3%BCrkiye.jpg?s=612x612&w=0&k=20&c=zuadezefDy2aCVlailis7QNGs1Qv3TWuvNm9m8wQEDs="
  ];

  gallery.innerHTML = "";

  imageSources.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Adana Görseli";
    gallery.appendChild(img);
  });
});




fetch("sozluk.json")
  .then(res => res.json())
  .then(data => {
    const liste = document.getElementById("kelimeListesi");

    data.forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item.kelime;
      btn.addEventListener("click", () => {
        alert(`${item.kelime}: ${item.anlam}`);
      });
      liste.appendChild(btn);
    });
  })
  .catch(err => {
    document.getElementById("kelimeListesi").textContent = "Sözlük yüklenemedi.";
    console.error(err);
  });

  document.getElementById("kelimeGoster").addEventListener("click", async () => {
  try {
    const response = await fetch("kelimeler.json");
    const data = await response.json();

    const rastgele = data[Math.floor(Math.random() * data.length)];

    document.getElementById("kelimeSonuc").innerHTML = `
      <h3>${rastgele.kelime}</h3>
      <p>${rastgele.anlam}</p>
    `;
  } catch (error) {
    document.getElementById("kelimeSonuc").textContent = "Kelime yüklenemedi.";
    console.error("Hata:", error);
  }
});
