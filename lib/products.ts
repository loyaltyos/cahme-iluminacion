export type Category =
  | "Alumbrado Publico"
  | "Iluminacion Industrial"
  | "Energia Solar"
  | "Iluminacion Residencial"
  | "Accesorios Electricos"
  | "Prueba de pago";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  specs: string[];
};

export const categories: Category[] = [
  "Alumbrado Publico",
  "Iluminacion Industrial",
  "Energia Solar",
  "Iluminacion Residencial",
  "Accesorios Electricos",
  "Prueba de pago"
];

export const categoryLabels: Record<Category, string> = {
  "Alumbrado Publico": "Alumbrado Publico",
  "Iluminacion Industrial": "Iluminacion Industrial",
  "Energia Solar": "Energia Solar",
  "Iluminacion Residencial": "Iluminacion Residencial",
  "Accesorios Electricos": "Accesorios Electricos",
  "Prueba de pago": "Prueba de pago"
};

const unsplashImages: Record<string, string> = {
  RvymL5gpZbU: "https://images.unsplash.com/photo-1757465184805-d8d49c20b196?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=sebastian-schuster-RvymL5gpZbU-unsplash.jpg&auto=format&fit=crop&w=1100",
  "4AlAXiU8Rgg": "https://images.unsplash.com/photo-1663058105415-f345a6872d62?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=german-krupenin-4AlAXiU8Rgg-unsplash.jpg&auto=format&fit=crop&w=1100",
  "49Ci6lN7xJY": "https://images.unsplash.com/photo-1776090188315-c481a5753867?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=lisk-obe-49Ci6lN7xJY-unsplash.jpg&auto=format&fit=crop&w=1100",
  X_CNRIfKqPM: "https://images.unsplash.com/photo-1768719952028-a180fe4583c4?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=you-le-X_CNRIfKqPM-unsplash.jpg&auto=format&fit=crop&w=1100",
  KDkU44ikiko: "https://images.unsplash.com/photo-1780034766295-43db0f2a0fb7?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=raymond-sime-KDkU44ikiko-unsplash.jpg&auto=format&fit=crop&w=1100",
  EuUWCz3pRGQ: "https://images.unsplash.com/photo-1675413461154-b8bb2828fe5c?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=siep-van-groningen-EuUWCz3pRGQ-unsplash.jpg&auto=format&fit=crop&w=1100",
  UyUscfJeBd8: "https://images.unsplash.com/photo-1638573200214-b826bedcf597?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=warner-shaw-UyUscfJeBd8-unsplash.jpg&auto=format&fit=crop&w=1100",
  tey1ez9WseM: "https://images.unsplash.com/photo-1763235851965-9efe071e8bb3?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=sebastian-rachmaciej-tey1ez9WseM-unsplash.jpg&auto=format&fit=crop&w=1100",
  cdBOHC22CU4: "https://images.unsplash.com/photo-1776090188275-72957bae4ed7?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=lisk-obe-cdBOHC22CU4-unsplash.jpg&auto=format&fit=crop&w=1100",
  yi1MAot4YBs: "https://images.unsplash.com/photo-1694875546238-67cb3596adf1?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=ptrcwrnr-yi1MAot4YBs-unsplash.jpg&auto=format&fit=crop&w=1100",
  r2y_yWQekTA: "https://images.unsplash.com/photo-1715783058283-2e31a1cb7684?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=tim-bish-r2y_yWQekTA-unsplash.jpg&auto=format&fit=crop&w=1100",
  w0bEMjKpLQw: "https://images.unsplash.com/photo-1685459143178-2c24b66d44df?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=ryan-vargas-w0bEMjKpLQw-unsplash.jpg&auto=format&fit=crop&w=1100",
  "r109-jWqS6s": "https://images.unsplash.com/photo-1753085462800-c905b408fcb7?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=saiwei-che-r109-jWqS6s-unsplash.jpg&auto=format&fit=crop&w=1100",
  "rABfF8Dxu-c": "https://images.unsplash.com/photo-1775646239349-49a01e01e203?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=pranab-debnath-rABfF8Dxu-c-unsplash.jpg&auto=format&fit=crop&w=1100",
  D6xxk3_qZss: "https://images.unsplash.com/photo-1778855400423-b8208c9ed9df?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=n1ce-D6xxk3_qZss-unsplash.jpg&auto=format&fit=crop&w=1100",
  QyvRyDs17Rs: "https://images.unsplash.com/photo-1744804561226-6449eb05a44a?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=mochamad-reza-aditya-QyvRyDs17Rs-unsplash.jpg&auto=format&fit=crop&w=1100",
  "7ay34r8ahEU": "https://images.unsplash.com/photo-1780303020973-52dd0b639715?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=declan-sun-7ay34r8ahEU-unsplash.jpg&auto=format&fit=crop&w=1100",
  "7oAneWHzwwE": "https://images.unsplash.com/photo-1762180075273-0527bdc7fa85?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=si-nguyen-7oAneWHzwwE-unsplash.jpg&auto=format&fit=crop&w=1100",
  tfNRLxMuoW8: "https://images.unsplash.com/photo-1658692051708-519fbdac7e8f?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=stefan-hiienurm-tfNRLxMuoW8-unsplash.jpg&auto=format&fit=crop&w=1100",
  GGHfJLK1DBY: "https://images.unsplash.com/photo-1780851585516-f37093131244?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=ilya-semenov-GGHfJLK1DBY-unsplash.jpg&auto=format&fit=crop&w=1100",
  EUoijjayhYs: "https://images.unsplash.com/photo-1780699364751-330c2b2f6184?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=jacob-mcgowin-EUoijjayhYs-unsplash.jpg&auto=format&fit=crop&w=1100",
  PkHf7BUWbtk: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=toolmash-expo-PkHf7BUWbtk-unsplash.jpg&auto=format&fit=crop&w=1100",
  "4D86w8wVh78": "https://images.unsplash.com/photo-1741177364447-f79669c51f12?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=tuan-nguyen-4D86w8wVh78-unsplash.jpg&auto=format&fit=crop&w=1100",
  q0Jo_J5YxHY: "https://images.unsplash.com/photo-1753272691001-4d68806ac590?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=aleksandr-lyaptsev-q0Jo_J5YxHY-unsplash.jpg&auto=format&fit=crop&w=1100",
  lQa1ZX0R3Os: "https://images.unsplash.com/photo-1751486289947-4f5f5961b3aa?ixlib=rb-4.1.0&q=80&fm=jpg&crop=entropy&cs=srgb&dl=fabian-kleiser-lQa1ZX0R3Os-unsplash.jpg&auto=format&fit=crop&w=1100"
};

const unsplashPhoto = (id: string) => unsplashImages[id];

export const heroLightingImage = unsplashPhoto("RvymL5gpZbU");

export const projectImages = {
  street: unsplashPhoto("4AlAXiU8Rgg"),
  industrial: unsplashPhoto("49Ci6lN7xJY"),
  solar: unsplashPhoto("X_CNRIfKqPM"),
  electrical: unsplashPhoto("KDkU44ikiko")
};

const categoryImages = {
  publicLighting: [
    unsplashPhoto("RvymL5gpZbU"),
    unsplashPhoto("4AlAXiU8Rgg"),
    unsplashPhoto("EuUWCz3pRGQ"),
    unsplashPhoto("UyUscfJeBd8"),
    unsplashPhoto("tey1ez9WseM")
  ],
  industrial: [
    unsplashPhoto("49Ci6lN7xJY"),
    unsplashPhoto("cdBOHC22CU4"),
    unsplashPhoto("yi1MAot4YBs"),
    unsplashPhoto("r2y_yWQekTA"),
    unsplashPhoto("w0bEMjKpLQw")
  ],
  solar: [
    unsplashPhoto("X_CNRIfKqPM"),
    unsplashPhoto("r109-jWqS6s"),
    unsplashPhoto("rABfF8Dxu-c"),
    unsplashPhoto("D6xxk3_qZss"),
    unsplashPhoto("QyvRyDs17Rs")
  ],
  residential: [
    unsplashPhoto("7ay34r8ahEU"),
    unsplashPhoto("7oAneWHzwwE"),
    unsplashPhoto("tfNRLxMuoW8"),
    unsplashPhoto("GGHfJLK1DBY"),
    unsplashPhoto("EUoijjayhYs")
  ],
  accessories: [
    unsplashPhoto("KDkU44ikiko"),
    unsplashPhoto("PkHf7BUWbtk"),
    unsplashPhoto("4D86w8wVh78"),
    unsplashPhoto("q0Jo_J5YxHY"),
    unsplashPhoto("lQa1ZX0R3Os")
  ]
};

export const products: Product[] = [
  {
    id: "test-openpay-100",
    name: "Compra mínima CAMHE Iluminación",
    category: "Prueba de pago",
    description: "Producto de bajo monto para validación de pagos Openpay.",
    price: 100,
    image: categoryImages.residential[0],
    specs: ["$100 MXN", "Openpay", "Validación"]
  },
  {
    id: "ap-01",
    name: "Luminaria Vial LED Titan 120W",
    category: "Alumbrado Publico",
    description: "Cuerpo de aluminio, optica vial asimetrica y flujo estable para avenidas principales.",
    price: 3890,
    image: categoryImages.publicLighting[0],
    specs: ["120W", "IP66", "50,000 h"]
  },
  {
    id: "ap-02",
    name: "Poste Conico Galvanizado 9 m",
    category: "Alumbrado Publico",
    description: "Poste urbano galvanizado para luminarias LED de alto montaje en vialidades y parques.",
    price: 11850,
    image: categoryImages.publicLighting[1],
    specs: ["9 m", "Galvanizado", "Base ancla"]
  },
  {
    id: "ap-03",
    name: "Brazo Curvo para Alumbrado",
    category: "Alumbrado Publico",
    description: "Brazo reforzado compatible con postes conicos y luminarias viales de alto rendimiento.",
    price: 950,
    image: categoryImages.publicLighting[2],
    specs: ["1.5 m", "Acero", "Exterior"]
  },
  {
    id: "ap-04",
    name: "Reflector Urbano LED 200W",
    category: "Alumbrado Publico",
    description: "Reflector de gran cobertura para explanadas, estacionamientos y areas deportivas.",
    price: 4560,
    image: categoryImages.publicLighting[3],
    specs: ["200W", "IP65", "6000K"]
  },
  {
    id: "ap-05",
    name: "Fotocelda Inteligente 220V",
    category: "Alumbrado Publico",
    description: "Control automatico dia/noche para sistemas de alumbrado publico y perimetral.",
    price: 420,
    image: categoryImages.publicLighting[4],
    specs: ["220V", "NEMA", "Automatica"]
  },
  {
    id: "ii-01",
    name: "High Bay Industrial LED 150W",
    category: "Iluminacion Industrial",
    description: "Campana LED de alto flujo para naves, bodegas y centros logisticos.",
    price: 3290,
    image: categoryImages.industrial[0],
    specs: ["150W", "UFO", "120 lm/W"]
  },
  {
    id: "ii-02",
    name: "High Bay Industrial LED 240W",
    category: "Iluminacion Industrial",
    description: "Solucion de alta potencia para alturas superiores y operacion continua.",
    price: 5280,
    image: categoryImages.industrial[1],
    specs: ["240W", "IP65", "Dimeable"]
  },
  {
    id: "ii-03",
    name: "Linea Hermetica LED 60W",
    category: "Iluminacion Industrial",
    description: "Luminaria sellada para pasillos tecnicos, talleres y zonas con polvo o humedad.",
    price: 1390,
    image: categoryImages.industrial[2],
    specs: ["60W", "IP65", "120 cm"]
  },
  {
    id: "ii-04",
    name: "Reflector Industrial 300W",
    category: "Iluminacion Industrial",
    description: "Proyector robusto para patios de maniobra, fachadas y patios industriales.",
    price: 6120,
    image: categoryImages.industrial[3],
    specs: ["300W", "IK08", "Frio"]
  },
  {
    id: "ii-05",
    name: "Panel LED Clean Room 48W",
    category: "Iluminacion Industrial",
    description: "Panel sellado para laboratorios, areas limpias y espacios productivos controlados.",
    price: 1780,
    image: categoryImages.industrial[4],
    specs: ["48W", "UGR bajo", "60x60"]
  },
  {
    id: "es-01",
    name: "Luminaria Solar LED 80W",
    category: "Energia Solar",
    description: "Luminaria solar autonoma para vialidades internas, parques y caminos perimetrales.",
    price: 4960,
    image: categoryImages.solar[0],
    specs: ["80W", "Panel integrado", "IP65"]
  },
  {
    id: "es-02",
    name: "Poste Solar Integrado 6 m",
    category: "Energia Solar",
    description: "Sistema con poste, panel y luminaria LED para zonas sin canalizacion electrica.",
    price: 24800,
    image: categoryImages.solar[1],
    specs: ["6 m", "Autonomo", "Fotocelda"]
  },
  {
    id: "es-03",
    name: "Reflector Solar Exterior 200W",
    category: "Energia Solar",
    description: "Reflector con panel remoto para patios, accesos y areas exteriores sin acometida.",
    price: 57900,
    image: categoryImages.solar[2],
    specs: ["200W", "Control remoto", "Exterior"]
  },
  {
    id: "es-04",
    name: "Baliza Solar para Jardin",
    category: "Energia Solar",
    description: "Baliza LED solar para andadores, jardines, amenidades y senalizacion peatonal.",
    price: 3890,
    image: categoryImages.solar[3],
    specs: ["Solar", "Calida", "Exterior"]
  },
  {
    id: "es-05",
    name: "Kit Solar para Alumbrado",
    category: "Energia Solar",
    description: "Conjunto de panel, bateria y controlador para proyectos de iluminacion autonoma.",
    price: 42800,
    image: categoryImages.solar[4],
    specs: ["Panel", "Bateria", "Control"]
  },
  {
    id: "ir-01",
    name: "Downlight LED Premium 18W",
    category: "Iluminacion Residencial",
    description: "Luz empotrable de acabado limpio para interiores residenciales y comerciales.",
    price: 360,
    image: categoryImages.residential[0],
    specs: ["18W", "3000K", "Empotrable"]
  },
  {
    id: "ir-02",
    name: "Tira LED Arquitectonica 24V",
    category: "Iluminacion Residencial",
    description: "Tira flexible de alto desempeno para detalles indirectos y mobiliario.",
    price: 1180,
    image: categoryImages.residential[1],
    specs: ["24V", "5 m", "CRI 90"]
  },
  {
    id: "ir-03",
    name: "Plafon Circular LED 36W",
    category: "Iluminacion Residencial",
    description: "Plafon moderno para habitaciones, oficinas domesticas y pasillos amplios.",
    price: 740,
    image: categoryImages.residential[2],
    specs: ["36W", "Blanco", "Sobreponer"]
  },
  {
    id: "ir-04",
    name: "Spot Dirigible Negro 12W",
    category: "Iluminacion Residencial",
    description: "Spot orientable con acabado negro mate para acentos de interior.",
    price: 510,
    image: categoryImages.residential[3],
    specs: ["12W", "Negro", "GU10"]
  },
  {
    id: "ir-05",
    name: "Lampara Lineal Suspendida 40W",
    category: "Iluminacion Residencial",
    description: "Luminaria suspendida de perfil minimalista para comedores, barras y oficinas.",
    price: 2290,
    image: categoryImages.residential[4],
    specs: ["40W", "120 cm", "Negro"]
  },
  {
    id: "ae-01",
    name: "Centro de Carga 12 Polos",
    category: "Accesorios Electricos",
    description: "Gabinete compacto para distribucion electrica residencial y comercial ligera.",
    price: 1490,
    image: categoryImages.accessories[0],
    specs: ["12 polos", "NEMA 1", "Acero"]
  },
  {
    id: "ae-02",
    name: "Interruptor Termomagnetico 2P 40A",
    category: "Accesorios Electricos",
    description: "Proteccion confiable para circuitos de iluminacion, fuerza y equipos.",
    price: 520,
    image: categoryImages.accessories[1],
    specs: ["2 polos", "40A", "DIN"]
  },
  {
    id: "ae-03",
    name: "Cable THW-LS Calibre 10",
    category: "Accesorios Electricos",
    description: "Conductor de baja emision de humos para instalaciones seguras y durables.",
    price: 2890,
    image: categoryImages.accessories[2],
    specs: ["Cal. 10", "100 m", "Cobre"]
  },
  {
    id: "ae-04",
    name: "Canaleta Industrial 2 pulgadas",
    category: "Accesorios Electricos",
    description: "Sistema de conduccion para cableado ordenado en instalaciones aparentes.",
    price: 230,
    image: categoryImages.accessories[3],
    specs: ["2 pulg.", "PVC", "3 m"]
  },
  {
    id: "ae-05",
    name: "Supresor de Picos 40 kA",
    category: "Accesorios Electricos",
    description: "Proteccion contra transientes para tableros electricos y equipos sensibles.",
    price: 2890,
    image: categoryImages.accessories[4],
    specs: ["40 kA", "DIN", "LED"]
  }
];

export const featuredProducts = products.slice(0, 8);

export const productById = new Map(products.map((product) => [product.id, product]));

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(price);
}
