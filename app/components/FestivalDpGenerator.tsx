"use client";

import { useEffect, useRef, useState } from "react";

export type CardVibe =
  | "Owambe Gold"
  | "Midnight Tech"
  | "Lagos Sunset"
  | "Naija Green";

export type EventsAttendedOption = "none" | "0-5" | "5-10" | "10+";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const JOIN_YEARS = [
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
];

const ALX_PROGRAMMES = [
  "AiCE (AI Career Essentials)",
  "Virtual Assistant",
  "Data Analytics",
  "Data Science",
  "Software Engineering",
  "AWS Cloud Computing",
  "Cybersecurity",
  "Salesforce Administrator",
  "Professional Foundations",
  "Founders Academy / Ventures",
  "Creative Tech / Content Creation",
  "Other",
];

const EVENTS_ATTENDED_OPTIONS: { value: EventsAttendedOption; label: string }[] =
  [
    { value: "none", label: "None" },
    { value: "0-5", label: "0 - 5" },
    { value: "5-10", label: "5 - 10" },
    { value: "10+", label: "10+" },
  ];

const CARD_VIBES: {
  id: CardVibe;
  tagline: string;
  swatchBg: string;
  swatchBorder: string;
}[] = [
  {
    id: "Owambe Gold",
    tagline: "Festive Gold & Deep Navy",
    swatchBg: "bg-[#EAB308]",
    swatchBorder: "border-[#03134F]",
  },
  {
    id: "Midnight Tech",
    tagline: "Deep Navy & Electric Blue Grid",
    swatchBg: "bg-[#03134F]",
    swatchBorder: "border-[#0452F0]",
  },
  {
    id: "Lagos Sunset",
    tagline: "Electric Blue & Gold Horizon",
    swatchBg: "bg-[#0452F0]",
    swatchBorder: "border-[#EAB308]",
  },
  {
    id: "Naija Green",
    tagline: "Emerald Green & Navy Pride",
    swatchBg: "bg-[#02B75E]",
    swatchBorder: "border-[#03134F]",
  },
];

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".heic", ".heif"];
const ALLOWED_MIMES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/heic",
  "image/heif",
];
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let truncated = text;
  while (
    truncated.length > 0 &&
    ctx.measureText(truncated + "…").width > maxWidth
  ) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + "…";
}

function drawFittedPill(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    y: number;
    height: number;
    text: string;
    font: string;
    paddingX: number;
    maxWidth: number;
    bgColor: string;
    borderColor: string;
    borderWidth?: number;
    textColor: string;
    shadowColor?: string;
    shadowOffset?: number;
  }
) {
  ctx.save();
  ctx.font = opts.font;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const fittedText = truncateText(
    ctx,
    opts.text,
    opts.maxWidth - opts.paddingX * 2
  );
  const measuredW = ctx.measureText(fittedText).width;
  const pillW = Math.min(
    opts.maxWidth,
    Math.ceil(measuredW + opts.paddingX * 2)
  );
  const pillX = opts.centerX - pillW / 2;
  const radius = opts.height / 2;

  if (opts.shadowColor && opts.shadowOffset) {
    drawRoundedRect(
      ctx,
      pillX + opts.shadowOffset,
      opts.y + opts.shadowOffset,
      pillW,
      opts.height,
      radius
    );
    ctx.fillStyle = opts.shadowColor;
    ctx.fill();
  }

  drawRoundedRect(ctx, pillX, opts.y, pillW, opts.height, radius);
  ctx.fillStyle = opts.bgColor;
  ctx.fill();

  if (opts.borderWidth && opts.borderWidth > 0) {
    ctx.lineWidth = opts.borderWidth;
    ctx.strokeStyle = opts.borderColor;
    ctx.stroke();
  }

  ctx.fillStyle = opts.textColor;
  ctx.fillText(fittedText, opts.centerX, opts.y + opts.height / 2 + 1);
  ctx.restore();
}

export default function FestivalDpGenerator() {
  // 1. Name (Required)
  const [fullName, setFullName] = useState("");
  // 2. State (Required)
  const [selectedState, setSelectedState] = useState("");
  // 3. Photo upload & framing (Required)
  const [userPhotoImg, setUserPhotoImg] = useState<HTMLImageElement | null>(
    null
  );
  const [photoFileName, setPhotoFileName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [photoZoom, setPhotoZoom] = useState(1.05);
  const [photoPanX, setPhotoPanX] = useState(0);
  const [photoPanY, setPhotoPanY] = useState(0);
  // 4. Year joined ALX (Required)
  const [joinYear, setJoinYear] = useState("");
  // 5. Completed ALX programmes (Required, checkboxes + "Other")
  const [selectedProgrammes, setSelectedProgrammes] = useState<string[]>([]);
  const [otherProgrammeText, setOtherProgrammeText] = useState("");
  // 6. Events attended this year (Required)
  const [eventsAttended, setEventsAttended] = useState<
    EventsAttendedOption | ""
  >("");
  // 7. Community friends made (Required, 0 to 50)
  const [friendsCount, setFriendsCount] = useState<string>("5");
  // 8. Card Vibe (Optional, default Owambe Gold)
  const [cardVibe, setCardVibe] = useState<CardVibe>("Owambe Gold");
  // 9. Volunteered / hub / award / challenge (Optional, Yes/No)
  const [volunteered, setVolunteered] = useState<"Yes" | "No" | "">("");
  // 10. Consent Checkbox (Required)
  const [consentChecked, setConsentChecked] = useState(false);

  // Preloaded brand logos (STRICTLY NO legacy-point-logo.png on card)
  const [alxLogoImg, setAlxLogoImg] = useState<HTMLImageElement | null>(null);
  const [ocfLogoImg, setOcfLogoImg] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const alxImg = new window.Image();
    alxImg.crossOrigin = "anonymous";
    alxImg.onload = () => setAlxLogoImg(alxImg);
    alxImg.src = "/images/alx-white-logo.png";

    const ocfImg = new window.Image();
    ocfImg.crossOrigin = "anonymous";
    ocfImg.onload = () => setOcfLogoImg(ocfImg);
    ocfImg.src = "/images/OCF_logo.png";

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    const hasAllowedExt = ALLOWED_EXTENSIONS.some((ext) =>
      lowerName.endsWith(ext)
    );
    const hasAllowedMime =
      file.type === "" || ALLOWED_MIMES.includes(file.type.toLowerCase());

    if (!hasAllowedExt && !hasAllowedMime) {
      setPhotoError("Please upload a PNG, JPG, WEBP, or HEIC image file.");
      return;
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      setPhotoError("Image size must be 10MB or less.");
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;

    const img = new window.Image();
    img.onload = () => {
      setUserPhotoImg(img);
      setPhotoFileName(file.name);
      setPhotoZoom(1.05);
      setPhotoPanX(0);
      setPhotoPanY(0);
    };
    img.onerror = () => {
      setUserPhotoImg(null);
      if (lowerName.endsWith(".heic") || lowerName.endsWith(".heif")) {
        setPhotoError(
          "Your current browser does not have a native HEIC decoder enabled. Please try on Safari/iOS or upload a JPG/PNG/WEBP photo."
        );
      } else {
        setPhotoError(
          "Could not decode this image file. Please try another photo."
        );
      }
    };
    img.src = objectUrl;
  };

  const toggleProgramme = (prog: string) => {
    setSelectedProgrammes((prev) =>
      prev.includes(prog) ? prev.filter((p) => p !== prog) : [...prev, prog]
    );
  };

  const parsedFriends = Math.max(
    0,
    Math.min(50, Number.isNaN(Number(friendsCount)) ? 0 : Number(friendsCount))
  );

  const effectiveProgrammes = selectedProgrammes.map((prog) => {
    if (prog === "Other" && otherProgrammeText.trim().length > 0) {
      return otherProgrammeText.trim().slice(0, 28);
    }
    return prog;
  });

  const missingFields: string[] = [];
  if (!fullName.trim()) missingFields.push("Name");
  if (!selectedState) missingFields.push("State");
  if (!userPhotoImg) missingFields.push("Photo");
  if (!joinYear) missingFields.push("Year Joined");
  if (effectiveProgrammes.length === 0) missingFields.push("ALX Programme(s)");
  if (!eventsAttended) missingFields.push("Events Attended");
  if (
    friendsCount.trim() === "" ||
    Number.isNaN(Number(friendsCount)) ||
    Number(friendsCount) < 0 ||
    Number(friendsCount) > 50
  ) {
    missingFields.push("Friends Count (0–50)");
  }
  if (!consentChecked) missingFields.push("Consent Agreement");

  const isReadyToDownload = missingFields.length === 0;

  // Draw the 1080x1350 social card with strict non-overlapping coordinates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1350;
    const cardX = 38;
    const cardY = 38;
    const cardW = W - 88; // 992
    const cardH = H - 88; // 1262
    const centerX = cardX + cardW / 2; // 534
    const maxContentW = cardW - 104; // 888

    const theme = (() => {
      switch (cardVibe) {
        case "Midnight Tech":
          return {
            outerBg: "#03134F",
            innerBg: "#03134F",
            frameBorder: "#C5E5FF",
            frameShadow: "#0452F0",
            photoBorder: "#02B75E",
            photoShadow: "#0452F0",
            accentPrimary: "#0452F0",
            accentSecondary: "#02B75E",
            badgeBg: "#C5E5FF",
            badgeText: "#03134F",
            titleText: "#F8F8F8",
            subText: "#C5E5FF",
            statCardBg: "#0452F0",
            statCardBorder: "#C5E5FF",
            statValueColor: "#EAB308",
            statLabelColor: "#F8F8F8",
            pillBg: "#03134F",
            pillBorder: "#02B75E",
            pillText: "#C5E5FF",
          };
        case "Lagos Sunset":
          return {
            outerBg: "#0452F0",
            innerBg: "#03134F",
            frameBorder: "#EAB308",
            frameShadow: "#03134F",
            photoBorder: "#EAB308",
            photoShadow: "#0452F0",
            accentPrimary: "#EAB308",
            accentSecondary: "#0452F0",
            badgeBg: "#EAB308",
            badgeText: "#03134F",
            titleText: "#F8F8F8",
            subText: "#C5E5FF",
            statCardBg: "#F8F8F8",
            statCardBorder: "#EAB308",
            statValueColor: "#0452F0",
            statLabelColor: "#03134F",
            pillBg: "#0452F0",
            pillBorder: "#EAB308",
            pillText: "#F8F8F8",
          };
        case "Naija Green":
          return {
            outerBg: "#02B75E",
            innerBg: "#03134F",
            frameBorder: "#F8F8F8",
            frameShadow: "#03134F",
            photoBorder: "#02B75E",
            photoShadow: "#EAB308",
            accentPrimary: "#02B75E",
            accentSecondary: "#EAB308",
            badgeBg: "#02B75E",
            badgeText: "#03134F",
            titleText: "#F8F8F8",
            subText: "#C5E5FF",
            statCardBg: "#F8F8F8",
            statCardBorder: "#02B75E",
            statValueColor: "#03134F",
            statLabelColor: "#03134F",
            pillBg: "#02B75E",
            pillBorder: "#F8F8F8",
            pillText: "#03134F",
          };
        case "Owambe Gold":
        default:
          return {
            outerBg: "#EAB308",
            innerBg: "#03134F",
            frameBorder: "#F8F8F8",
            frameShadow: "#0452F0",
            photoBorder: "#EAB308",
            photoShadow: "#02B75E",
            accentPrimary: "#EAB308",
            accentSecondary: "#02B75E",
            badgeBg: "#EAB308",
            badgeText: "#03134F",
            titleText: "#F8F8F8",
            subText: "#C5E5FF",
            statCardBg: "#F8F8F8",
            statCardBorder: "#0452F0",
            statValueColor: "#03134F",
            statLabelColor: "#03134F",
            pillBg: "#0452F0",
            pillBorder: "#C5E5FF",
            pillText: "#F8F8F8",
          };
      }
    })();

    // 1. Fill Outer Background
    ctx.fillStyle = theme.outerBg;
    ctx.fillRect(0, 0, W, H);

    // 2. Main Poster Card Container Shadow + Body
    drawRoundedRect(ctx, cardX + 12, cardY + 12, cardW, cardH, 40);
    ctx.fillStyle = theme.frameShadow;
    ctx.fill();

    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 40);
    ctx.fillStyle = theme.innerBg;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = theme.frameBorder;
    ctx.stroke();

    // Theme-specific decorative background geometry inside the card
    ctx.save();
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 40);
    ctx.clip();

    if (cardVibe === "Midnight Tech") {
      ctx.strokeStyle = "#0452F0";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.22;
      for (let x = cardX; x < cardX + cardW; x += 54) {
        ctx.beginPath();
        ctx.moveTo(x, cardY);
        ctx.lineTo(x, cardY + cardH);
        ctx.stroke();
      }
      for (let y = cardY; y < cardY + cardH; y += 54) {
        ctx.beginPath();
        ctx.moveTo(cardX, y);
        ctx.lineTo(cardX + cardW, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    } else if (cardVibe === "Lagos Sunset") {
      ctx.fillStyle = "#0452F0";
      ctx.beginPath();
      ctx.moveTo(cardX, cardY);
      ctx.lineTo(cardX + cardW, cardY);
      ctx.lineTo(cardX + cardW, 385);
      ctx.lineTo(cardX, 465);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#EAB308";
      ctx.beginPath();
      ctx.moveTo(cardX, 450);
      ctx.lineTo(cardX + cardW, 370);
      ctx.lineTo(cardX + cardW, 395);
      ctx.lineTo(cardX, 475);
      ctx.closePath();
      ctx.fill();
    } else if (cardVibe === "Naija Green") {
      ctx.fillStyle = "#02B75E";
      ctx.fillRect(cardX, cardY, cardW, 255);
      ctx.fillStyle = "#EAB308";
      ctx.fillRect(cardX, 293, cardW, 12);
    } else {
      ctx.fillStyle = "#0452F0";
      ctx.fillRect(cardX, cardY, cardW, 245);
      ctx.fillStyle = "#EAB308";
      ctx.fillRect(cardX, 283, cardW, 14);
    }

    // =========================================================================
    // CLEAN STANDALONE OWAMBE CUTOUT PROPS (No background boxes, shadows, or labels)
    // =========================================================================

    // CUTOUT 1 (Top-Left): Owambe Party Stunner Shades / Glasses
    {
      const gx = 202;
      const gy = 322;
      const angle = -10;

      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate((angle * Math.PI) / 180);

      // Left & Right Chunky Gold Frames
      ctx.fillStyle = "#EAB308";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#03134F";

      drawRoundedRect(ctx, -74, -24, 66, 50, 12);
      ctx.fill();
      ctx.stroke();

      drawRoundedRect(ctx, 8, -24, 66, 50, 12);
      ctx.fill();
      ctx.stroke();

      // Top Bridge Bar
      ctx.fillStyle = "#EAB308";
      ctx.fillRect(-14, -18, 28, 12);
      ctx.strokeRect(-14, -18, 28, 12);

      // Left Lens
      drawRoundedRect(ctx, -66, -16, 50, 34, 8);
      ctx.fillStyle = "#03134F";
      ctx.fill();

      // Right Lens
      drawRoundedRect(ctx, 16, -16, 50, 34, 8);
      ctx.fillStyle = "#03134F";
      ctx.fill();

      // Diagonal Shutter/Glare Slashes across lenses
      ctx.strokeStyle = "#C5E5FF";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-56, 8);
      ctx.lineTo(-38, -10);
      ctx.moveTo(-44, 10);
      ctx.lineTo(-30, -4);
      ctx.moveTo(24, 8);
      ctx.lineTo(42, -10);
      ctx.moveTo(36, 10);
      ctx.lineTo(50, -4);
      ctx.stroke();
      ctx.restore();
    }

    // CUTOUT 2 (Bottom-Left): Nigerian Talking Drum (Gangan) & Curved Stick (Kọ́kọ́)
    {
      const dx = 198;
      const dy = 472;
      const angle = 7;

      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate((angle * Math.PI) / 180);

      // Hourglass Talking Drum Body
      ctx.beginPath();
      ctx.moveTo(-36, -44);
      ctx.quadraticCurveTo(-12, 0, -36, 44);
      ctx.lineTo(28, 44);
      ctx.quadraticCurveTo(4, 0, 28, -44);
      ctx.closePath();
      ctx.fillStyle = "#EAB308";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();

      // Center Waist Band on Drum
      ctx.fillStyle = "#02B75E";
      ctx.fillRect(-20, -7, 32, 14);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#03134F";
      ctx.strokeRect(-20, -7, 32, 14);

      // Vertical Tension Cords (Strings connecting top & bottom drumheads)
      ctx.strokeStyle = "#03134F";
      ctx.lineWidth = 2.2;
      for (let sx = -30; sx <= 22; sx += 13) {
        ctx.beginPath();
        ctx.moveTo(sx, -42);
        ctx.lineTo(sx, 42);
        ctx.stroke();
      }

      // Top & Bottom Drumheads
      ctx.beginPath();
      ctx.ellipse(-4, -44, 32, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#C5E5FF";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(-4, 44, 32, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#0452F0";
      ctx.fill();
      ctx.stroke();

      // Curved Talking Drum Beater Stick (Kọ́kọ́) on the right
      ctx.beginPath();
      ctx.moveTo(46, 38);
      ctx.lineTo(46, -14);
      ctx.quadraticCurveTo(46, -36, 24, -32);
      ctx.lineWidth = 6.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#F8F8F8";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(22, -31, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#02B75E";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();
      ctx.restore();
    }

    // CUTOUT 3 (Top-Right): Aso-Ebi Pleated Owambe Hand Fan (Abẹ̀bẹ̀)
    {
      const fx = 866;
      const fy = 318;
      const angle = 10;

      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate((angle * Math.PI) / 180);

      // Pleated Circular Fan Blades
      const blades = 12;
      const fanR = 44;
      for (let i = 0; i < blades; i++) {
        const a1 = (i * Math.PI * 2) / blades;
        const a2 = ((i + 1) * Math.PI * 2) / blades;
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.arc(0, -6, fanR, a1, a2);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? "#02B75E" : "#C5E5FF";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#03134F";
        ctx.stroke();
      }

      // Inner Gold Medallion of Fan
      ctx.beginPath();
      ctx.arc(0, -6, 16, 0, Math.PI * 2);
      ctx.fillStyle = "#EAB308";
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();

      // Fan Handle at bottom
      drawRoundedRect(ctx, -8, 30, 16, 26, 6);
      ctx.fillStyle = "#EAB308";
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();
      ctx.restore();
    }

    // CUTOUT 4 (Bottom-Right): Wrapped Holiday Gift / Party Box Cutout
    {
      const bx = 866;
      const by = 472;
      const angle = -7;

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate((angle * Math.PI) / 180);

      // Gift Box Base
      drawRoundedRect(ctx, -38, -8, 76, 54, 8);
      ctx.fillStyle = "#C5E5FF";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();

      // Gift Box Lid
      drawRoundedRect(ctx, -44, -24, 88, 18, 6);
      ctx.fillStyle = "#F8F8F8";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();

      // Gold Cross Ribbons
      ctx.fillStyle = "#EAB308";
      ctx.fillRect(-9, -24, 18, 70);
      ctx.strokeRect(-9, -24, 18, 70);
      ctx.fillRect(-38, 12, 76, 15);
      ctx.strokeRect(-38, 12, 76, 15);

      // Ribbon Bow Loops
      ctx.beginPath();
      ctx.ellipse(-13, -31, 13, 8, -0.35, 0, Math.PI * 2);
      ctx.ellipse(13, -31, 13, 8, 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "#EAB308";
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#03134F";
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();

    // 3. Top Header Row (y = 66..140): ALX Logo Left + OCF Logo Right
    if (alxLogoImg) {
      const alxH = 50;
      const alxW = (alxLogoImg.width / alxLogoImg.height) * alxH;
      ctx.drawImage(alxLogoImg, 86, 76, alxW, alxH);
    } else {
      ctx.fillStyle = "#F8F8F8";
      ctx.font = "900 46px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("alx", 86, 118);
    }

    const ocfBoxW = 212;
    const ocfBoxH = 76;
    const ocfBoxX = cardX + cardW - ocfBoxW - 48;
    const ocfBoxY = 64;
    drawRoundedRect(ctx, ocfBoxX, ocfBoxY, ocfBoxW, ocfBoxH, 16);
    ctx.fillStyle = "#F8F8F8";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#03134F";
    ctx.stroke();

    if (ocfLogoImg) {
      const ocfH = 58;
      const ocfW = (ocfLogoImg.width / ocfLogoImg.height) * ocfH;
      ctx.drawImage(
        ocfLogoImg,
        ocfBoxX + (ocfBoxW - ocfW) / 2,
        ocfBoxY + (ocfBoxH - ocfH) / 2,
        ocfW,
        ocfH
      );
    }

    // 4. Header Party Banner Pill (y = 156..204)
    drawFittedPill(ctx, {
      centerX,
      y: 156,
      height: 48,
      text: "🎉 I’M READY FOR THE ALX END-OF-YEAR CHRISTMAS PARTY! 🎉",
      font: "900 20px sans-serif",
      paddingX: 34,
      maxWidth: maxContentW,
      bgColor: "#03134F",
      borderColor: "#F8F8F8",
      borderWidth: 3,
      textColor: "#EAB308",
    });

    // 5. Center Portrait Photo Frame (y = 226..556) — NOTHING overlaps the photo or its shadow
    const photoBoxSize = 330;
    const photoX = centerX - photoBoxSize / 2;
    const photoY = 226;

    // Offset Block Shadow
    drawRoundedRect(
      ctx,
      photoX + 12,
      photoY + 12,
      photoBoxSize,
      photoBoxSize,
      34
    );
    ctx.fillStyle = theme.photoShadow;
    ctx.fill();

    // Photo Clip Area
    ctx.save();
    drawRoundedRect(ctx, photoX, photoY, photoBoxSize, photoBoxSize, 34);
    ctx.fillStyle = "#C5E5FF";
    ctx.fill();
    ctx.clip();

    if (userPhotoImg) {
      const imgRatio = userPhotoImg.width / userPhotoImg.height;
      let drawW = photoBoxSize;
      let drawH = photoBoxSize;
      if (imgRatio > 1) {
        drawH = photoBoxSize;
        drawW = photoBoxSize * imgRatio;
      } else {
        drawW = photoBoxSize;
        drawH = photoBoxSize / imgRatio;
      }
      drawW *= photoZoom;
      drawH *= photoZoom;

      const offsetX =
        photoX + (photoBoxSize - drawW) / 2 + (photoPanX / 100) * 130;
      const offsetY =
        photoY + (photoBoxSize - drawH) / 2 + (photoPanY / 100) * 130;

      ctx.drawImage(userPhotoImg, offsetX, offsetY, drawW, drawH);
    } else {
      ctx.fillStyle = "#03134F";
      ctx.fillRect(photoX, photoY, photoBoxSize, photoBoxSize);

      ctx.fillStyle = "#0452F0";
      ctx.beginPath();
      ctx.arc(centerX, photoY + 118, 52, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, photoY + 295, 105, Math.PI, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#C5E5FF";
      ctx.font = "800 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("UPLOAD YOUR PHOTO", centerX, photoY + 210);
      ctx.font = "600 16px sans-serif";
      ctx.fillText("FOR LIVE CARD PREVIEW", centerX, photoY + 236);
    }
    ctx.restore();

    // Photo Frame Outline
    drawRoundedRect(ctx, photoX, photoY, photoBoxSize, photoBoxSize, 34);
    ctx.lineWidth = 7;
    ctx.strokeStyle = theme.photoBorder;
    ctx.stroke();

    // 6. Community Member Name (y = 608) — Auto-scales font so long names never clip
    const displayName = fullName.trim()
      ? fullName.trim().toUpperCase()
      : "YOUR NAME HERE";

    let nameFontSize = 46;
    ctx.font = `900 ${nameFontSize}px sans-serif`;
    while (
      nameFontSize > 28 &&
      ctx.measureText(displayName).width > maxContentW - 20
    ) {
      nameFontSize -= 2;
      ctx.font = `900 ${nameFontSize}px sans-serif`;
    }
    ctx.fillStyle = theme.titleText;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      truncateText(ctx, displayName, maxContentW),
      centerX,
      608
    );

    // 7. State + Year Joined Pill (y = 644..690)
    const displayState = selectedState ? `${selectedState} State` : "Your State";
    const displayYear = joinYear ? `Joined ALX in ${joinYear}` : "Joined ALX";
    const metaString = `📍 ${displayState}   •   🚀 ${displayYear}`;

    drawFittedPill(ctx, {
      centerX,
      y: 644,
      height: 46,
      text: metaString,
      font: "800 22px sans-serif",
      paddingX: 32,
      maxWidth: maxContentW,
      bgColor: theme.badgeBg,
      borderColor: "#03134F",
      borderWidth: 3,
      textColor: theme.badgeText,
    });

    // 8. Optional Volunteer / Community Champion Badge in its own dedicated non-overlapping row (y = 700..742)
    let progSectionTopY = 720;
    if (volunteered === "Yes") {
      drawFittedPill(ctx, {
        centerX,
        y: 700,
        height: 42,
        text: "⭐ 2026 HUB VOLUNTEER & COMMUNITY CHAMPION",
        font: "900 18px sans-serif",
        paddingX: 28,
        maxWidth: maxContentW,
        bgColor: "#EAB308",
        borderColor: "#F8F8F8",
        borderWidth: 3,
        textColor: "#03134F",
        shadowColor: "#0452F0",
        shadowOffset: 4,
      });
      progSectionTopY = 762;
    }

    // 9. Completed ALX Programmes Section (Multi-row wrapped pills so they never overflow horizontally)
    ctx.fillStyle = theme.subText;
    ctx.font = "800 17px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("COMPLETED ALX PROGRAMMES", centerX, progSectionTopY);

    const progsToDisplay =
      effectiveProgrammes.length > 0
        ? effectiveProgrammes
        : ["Select your completed ALX programmes"];

    ctx.font = "800 18px sans-serif";
    const pillPadX = 22;
    const pillGapX = 12;
    const pillH = 40;
    const rowGapY = 10;
    const maxRowW = maxContentW;
    const maxRows = volunteered === "Yes" ? 2 : 2;

    // Pack programme pills into at most 2 rows without exceeding maxRowW
    const rows: { label: string; width: number }[][] = [];
    let currentRow: { label: string; width: number }[] = [];
    let currentRowW = 0;

    for (let i = 0; i < progsToDisplay.length; i++) {
      const rawLabel = progsToDisplay[i];
      const remainingAfterThis = progsToDisplay.length - (i + 1);
      const isLastAllowedRow = rows.length === maxRows - 1;

      const measuredLabelW = Math.min(
        380,
        Math.ceil(ctx.measureText(rawLabel).width + pillPadX * 2)
      );

      // Reserve room for "+N More" if we're on the last row and more items remain
      const moreBadgeW =
        remainingAfterThis > 0
          ? Math.ceil(
              ctx.measureText(`+${remainingAfterThis + 1} More`).width +
                pillPadX * 2
            ) + pillGapX
          : 0;

      const candidateW =
        currentRow.length === 0
          ? measuredLabelW
          : currentRowW + pillGapX + measuredLabelW;

      if (
        isLastAllowedRow &&
        remainingAfterThis > 0 &&
        candidateW + moreBadgeW > maxRowW
      ) {
        const extraTotal = progsToDisplay.length - i;
        const moreLabel = `+${extraTotal} More`;
        const moreW = Math.ceil(
          ctx.measureText(moreLabel).width + pillPadX * 2
        );
        if (currentRow.length === 0 || currentRowW + pillGapX + moreW <= maxRowW) {
          currentRow.push({ label: moreLabel, width: moreW });
        }
        break;
      }

      if (candidateW <= maxRowW || currentRow.length === 0) {
        currentRow.push({ label: rawLabel, width: measuredLabelW });
        currentRowW = candidateW;
      } else {
        rows.push(currentRow);
        if (rows.length >= maxRows) {
          break;
        }
        currentRow = [{ label: rawLabel, width: measuredLabelW }];
        currentRowW = measuredLabelW;
      }
    }
    if (currentRow.length > 0 && rows.length < maxRows) {
      rows.push(currentRow);
    }

    let currentPillY = progSectionTopY + 18;
    rows.forEach((row) => {
      const rowTotalW =
        row.reduce((sum, item) => sum + item.width, 0) +
        pillGapX * Math.max(0, row.length - 1);
      let pillX = centerX - rowTotalW / 2;

      row.forEach((item) => {
        drawRoundedRect(ctx, pillX, currentPillY, item.width, pillH, pillH / 2);
        ctx.fillStyle = theme.pillBg;
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = theme.pillBorder;
        ctx.stroke();

        ctx.fillStyle = theme.pillText;
        ctx.font = "800 18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          truncateText(ctx, item.label, item.width - 20),
          pillX + item.width / 2,
          currentPillY + pillH / 2 + 1
        );

        pillX += item.width + pillGapX;
      });

      currentPillY += pillH + rowGapY;
    });

    // 10. Two Wrapped Stat Cards (y = 922..1110)
    const statCardW = 424;
    const statCardH = 186;
    const statGap = 36;
    const leftCardX = centerX - (statCardW * 2 + statGap) / 2;
    const rightCardX = leftCardX + statCardW + statGap;
    const cardsY = 922;

    // Left Stat Card: Community Events Attended
    drawRoundedRect(ctx, leftCardX + 8, cardsY + 8, statCardW, statCardH, 26);
    ctx.fillStyle = theme.accentSecondary;
    ctx.fill();

    drawRoundedRect(ctx, leftCardX, cardsY, statCardW, statCardH, 26);
    ctx.fillStyle = theme.statCardBg;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = theme.statCardBorder;
    ctx.stroke();

    const eventsValueDisplay =
      eventsAttended === "none"
        ? "1st Soon!"
        : eventsAttended
        ? `${eventsAttended}`
        : "0 - 5";

    ctx.fillStyle = theme.statValueColor;
    ctx.font = "900 54px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(eventsValueDisplay, leftCardX + statCardW / 2, cardsY + 66);

    ctx.fillStyle = theme.statLabelColor;
    ctx.font = "900 20px sans-serif";
    ctx.fillText("COMMUNITY EVENTS", leftCardX + statCardW / 2, cardsY + 122);
    ctx.font = "700 17px sans-serif";
    ctx.fillText(
      eventsAttended === "none"
        ? "Kickstarting at the Party!"
        : "Attended This Year",
      leftCardX + statCardW / 2,
      cardsY + 152
    );

    // Right Stat Card: Community Friends Made
    drawRoundedRect(ctx, rightCardX + 8, cardsY + 8, statCardW, statCardH, 26);
    ctx.fillStyle = theme.accentPrimary;
    ctx.fill();

    drawRoundedRect(ctx, rightCardX, cardsY, statCardW, statCardH, 26);
    ctx.fillStyle = theme.statCardBg;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = theme.statCardBorder;
    ctx.stroke();

    ctx.fillStyle = theme.statValueColor;
    ctx.font = "900 54px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${parsedFriends}`, rightCardX + statCardW / 2, cardsY + 66);

    ctx.fillStyle = theme.statLabelColor;
    ctx.font = "900 20px sans-serif";
    ctx.fillText("NEW ALX FRIENDS", rightCardX + statCardW / 2, cardsY + 122);
    ctx.font = "700 17px sans-serif";
    ctx.fillText(
      "Made in the Community",
      rightCardX + statCardW / 2,
      cardsY + 152
    );

    // 11. Bottom Event Callout Footer Banner (y = 1144..1258)
    const footerW = maxContentW;
    const footerH = 112;
    const footerX = centerX - footerW / 2;
    const footerY = 1144;

    drawRoundedRect(ctx, footerX, footerY, footerW, footerH, 24);
    ctx.fillStyle = "#0452F0";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#C5E5FF";
    ctx.stroke();

    ctx.fillStyle = "#EAB308";
    ctx.font = "900 21px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "END-OF-YEAR CHRISTMAS PARTY • SAT 12 DEC • 12:00 PM WAT",
      centerX,
      footerY + 38
    );

    ctx.fillStyle = "#F8F8F8";
    ctx.font = "800 20px sans-serif";
    ctx.fillText(
      "Join the Celebration: alx.ng/end-of-year  •  @alxnigeria",
      centerX,
      footerY + 78
    );
  }, [
    fullName,
    selectedState,
    userPhotoImg,
    photoZoom,
    photoPanX,
    photoPanY,
    joinYear,
    effectiveProgrammes,
    eventsAttended,
    parsedFriends,
    cardVibe,
    volunteered,
    alxLogoImg,
    ocfLogoImg,
  ]);

  const handleDownloadPng = () => {
    if (!isReadyToDownload || !canvasRef.current) return;
    const safeSlug =
      fullName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "community-member";

    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `alx-one-community-dp-${safeSlug}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="create-dp"
      className="py-16 sm:py-24 bg-[#03134F] text-[#F8F8F8] border-b-4 border-[#0452F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="bg-[#0452F0] rounded-3xl p-6 sm:p-10 border-4 border-[#C5E5FF] shadow-[8px_8px_0px_#EAB308] mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EAB308] text-[#03134F] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                <span>🎉 END-OF-YEAR PARTY GETDP &amp; 2026 WRAPPED</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F8F8F8]">
                Create Your Official Festival DP Card
              </h2>
              <p className="text-base sm:text-lg text-[#C5E5FF] mt-2 max-w-3xl font-medium">
                Counting down to the{" "}
                <strong className="text-[#EAB308]">
                  End-of-Year Christmas Party
                </strong>
                ? Customize your personal ALX 2026 community card, pick your
                card vibe, and download it immediately as a high-res PNG to
                share across social media!
              </p>
            </div>
            <div className="shrink-0">
              <div className="bg-[#03134F] text-[#C5E5FF] px-5 py-4 rounded-2xl border-2 border-[#02B75E] text-xs font-bold">
                <p className="text-[#02B75E] font-black uppercase tracking-wider mb-1">
                  INSTANT PNG GENERATOR
                </p>
                <p>✓ 1080 × 1350px Social Portrait</p>
                <p>✓ 4 Signature Card Vibes</p>
                <p>✓ 100% Private Browser Render</p>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Layout: Form Left (7 cols) + Live Preview Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: 10-QUESTION CUSTOMIZATION FORM */}
          <div className="lg:col-span-7 bg-[#F8F8F8] text-[#03134F] rounded-3xl p-6 sm:p-8 border-4 border-[#C5E5FF] shadow-[10px_10px_0px_#0452F0]">
            <div className="pb-5 mb-6 border-b-2 border-[#C5E5FF] flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#03134F]">
                  Personalize Your Card
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#0452F0]">
                  Fields marked with * are required to unlock PNG download
                </p>
              </div>
              <span className="bg-[#03134F] text-[#EAB308] text-xs font-black px-3 py-1 rounded-full">
                10 Quick Steps
              </span>
            </div>

            <div className="space-y-6">
              {/* Q1 & Q2: Name + State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="dp-name"
                    className="block text-sm font-black text-[#03134F] mb-1.5"
                  >
                    1. What name should appear on your card?{" "}
                    <span className="text-[#0452F0]">*</span>
                  </label>
                  <input
                    id="dp-name"
                    type="text"
                    required
                    maxLength={32}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chidinma Okafor"
                    className="w-full bg-[#C5E5FF] text-[#03134F] placeholder-[#03134F]/60 font-bold text-sm px-4 py-3 rounded-xl border-2 border-[#03134F] focus:outline-none focus:border-[#0452F0]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dp-state"
                    className="block text-sm font-black text-[#03134F] mb-1.5"
                  >
                    2. Which state are you in right now?{" "}
                    <span className="text-[#0452F0]">*</span>
                  </label>
                  <select
                    id="dp-state"
                    required
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-[#C5E5FF] text-[#03134F] font-bold text-sm px-4 py-3 rounded-xl border-2 border-[#03134F] focus:outline-none focus:border-[#0452F0]"
                  >
                    <option value="">Select your state...</option>
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Q3: Photo Upload + Framing Sliders */}
              <div className="bg-[#C5E5FF] p-4 sm:p-5 rounded-2xl border-2 border-[#03134F]">
                <label
                  htmlFor="dp-photo"
                  className="block text-sm font-black text-[#03134F] mb-1"
                >
                  3. Upload a photo of yourself (clear face, plain background if
                  possible) <span className="text-[#0452F0]">*</span>
                </label>
                <p className="text-xs font-semibold text-[#03134F] mb-3">
                  Supports PNG, JPG, WEBP, and HEIC (max 10MB)
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor="dp-photo"
                    className="inline-flex items-center gap-2 bg-[#0452F0] hover:bg-[#03134F] text-[#F8F8F8] font-black text-xs sm:text-sm px-4 py-2.5 rounded-full border-2 border-[#03134F] cursor-pointer transition-colors"
                  >
                    <span>📷 Choose Photo</span>
                  </label>
                  <input
                    id="dp-photo"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/heic,image/heif,.heic,.heif"
                    onChange={handlePhotoUpload}
                    className="sr-only"
                  />
                  <span className="text-xs font-bold text-[#03134F] truncate max-w-xs">
                    {photoFileName
                      ? `✓ Loaded: ${photoFileName}`
                      : "No photo selected yet"}
                  </span>
                </div>

                {photoError && (
                  <p className="mt-2.5 text-xs font-black bg-[#EAB308] text-[#03134F] px-3 py-2 rounded-lg border border-[#03134F]">
                    ⚠️ {photoError}
                  </p>
                )}

                {userPhotoImg && (
                  <div className="mt-4 pt-3 border-t border-[#03134F] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                    <div>
                      <label
                        htmlFor="dp-zoom"
                        className="block mb-1 text-[#03134F]"
                      >
                        Zoom ({photoZoom.toFixed(2)}x)
                      </label>
                      <input
                        id="dp-zoom"
                        type="range"
                        min={1}
                        max={2.4}
                        step={0.05}
                        value={photoZoom}
                        onChange={(e) => setPhotoZoom(Number(e.target.value))}
                        className="w-full accent-[#0452F0]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dp-pan-x"
                        className="block mb-1 text-[#03134F]"
                      >
                        Horizontal Position
                      </label>
                      <input
                        id="dp-pan-x"
                        type="range"
                        min={-100}
                        max={100}
                        step={2}
                        value={photoPanX}
                        onChange={(e) => setPhotoPanX(Number(e.target.value))}
                        className="w-full accent-[#0452F0]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dp-pan-y"
                        className="block mb-1 text-[#03134F]"
                      >
                        Vertical Position
                      </label>
                      <input
                        id="dp-pan-y"
                        type="range"
                        min={-100}
                        max={100}
                        step={2}
                        value={photoPanY}
                        onChange={(e) => setPhotoPanY(Number(e.target.value))}
                        className="w-full accent-[#0452F0]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Q4: Year Joined ALX */}
              <div>
                <label
                  htmlFor="dp-join-year"
                  className="block text-sm font-black text-[#03134F] mb-1.5"
                >
                  4. What year did you join ALX?{" "}
                  <span className="text-[#0452F0]">*</span>
                </label>
                <select
                  id="dp-join-year"
                  required
                  value={joinYear}
                  onChange={(e) => setJoinYear(e.target.value)}
                  className="w-full sm:w-64 bg-[#C5E5FF] text-[#03134F] font-bold text-sm px-4 py-3 rounded-xl border-2 border-[#03134F] focus:outline-none focus:border-[#0452F0]"
                >
                  <option value="">Select year (2019 – 2026)...</option>
                  {JOIN_YEARS.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Q5: Completed ALX Programmes (Checkboxes + Other) */}
              <div>
                <p className="block text-sm font-black text-[#03134F] mb-1">
                  5. Which ALX programmes have you completed? Tick all that
                  apply <span className="text-[#0452F0]">*</span>
                </p>
                <p className="text-xs font-semibold text-[#0452F0] mb-3">
                  Select at least one programme
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ALX_PROGRAMMES.map((prog) => {
                    const isChecked = selectedProgrammes.includes(prog);
                    return (
                      <label
                        key={prog}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer text-xs sm:text-sm font-bold transition-colors ${
                          isChecked
                            ? "bg-[#03134F] text-[#F8F8F8] border-[#0452F0]"
                            : "bg-[#C5E5FF] text-[#03134F] border-[#03134F] hover:bg-[#EAB308]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleProgramme(prog)}
                          className="w-4 h-4 accent-[#02B75E]"
                        />
                        <span>{prog}</span>
                      </label>
                    );
                  })}
                </div>

                {selectedProgrammes.includes("Other") && (
                  <div className="mt-3">
                    <label
                      htmlFor="dp-other-prog"
                      className="block text-xs font-black text-[#03134F] mb-1"
                    >
                      Specify your &ldquo;Other&rdquo; ALX programme:
                    </label>
                    <input
                      id="dp-other-prog"
                      type="text"
                      maxLength={28}
                      value={otherProgrammeText}
                      onChange={(e) => setOtherProgrammeText(e.target.value)}
                      placeholder="e.g. Graphic Design / Tech Sales"
                      className="w-full sm:w-80 bg-[#C5E5FF] text-[#03134F] font-bold text-sm px-3.5 py-2.5 rounded-xl border-2 border-[#03134F]"
                    />
                  </div>
                )}
              </div>

              {/* Q6: Community Events Attended (Radio Buttons) */}
              <div>
                <p className="block text-sm font-black text-[#03134F] mb-2">
                  6. How many community events did you attend this year?{" "}
                  <span className="text-[#0452F0]">*</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {EVENTS_ATTENDED_OPTIONS.map((opt) => {
                    const isSelected = eventsAttended === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer text-sm font-black transition-colors ${
                          isSelected
                            ? "bg-[#0452F0] text-[#F8F8F8] border-[#03134F] shadow-[3px_3px_0px_#03134F]"
                            : "bg-[#C5E5FF] text-[#03134F] border-[#03134F] hover:bg-[#EAB308]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="eventsAttended"
                          value={opt.value}
                          checked={isSelected}
                          onChange={() => setEventsAttended(opt.value)}
                          className="sr-only"
                        />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q7: Friends Made This Year (Number 0 to 50) */}
              <div>
                <label
                  htmlFor="dp-friends-number"
                  className="block text-sm font-black text-[#03134F] mb-1.5"
                >
                  7. How many people in this community would you call friends
                  you made this year? (0 to 50){" "}
                  <span className="text-[#0452F0]">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="dp-friends-number"
                    type="number"
                    min={0}
                    max={50}
                    required
                    value={friendsCount}
                    onChange={(e) => setFriendsCount(e.target.value)}
                    className="w-28 bg-[#C5E5FF] text-[#03134F] font-black text-base px-4 py-2.5 rounded-xl border-2 border-[#03134F]"
                  />
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={parsedFriends}
                    onChange={(e) => setFriendsCount(e.target.value)}
                    aria-label="Friends count slider"
                    className="flex-1 accent-[#0452F0]"
                  />
                  <span className="text-sm font-black bg-[#03134F] text-[#EAB308] px-3 py-1.5 rounded-lg">
                    {parsedFriends} Friends
                  </span>
                </div>
              </div>

              {/* Q8: Pick Your Card Vibe (Default Owambe Gold) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-black text-[#03134F]">
                    8. Pick your card vibe
                  </p>
                  <span className="text-xs font-bold text-[#0452F0]">
                    Default: Owambe Gold
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CARD_VIBES.map((vibe) => {
                    const isSelected = cardVibe === vibe.id;
                    return (
                      <button
                        key={vibe.id}
                        type="button"
                        onClick={() => setCardVibe(vibe.id)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[#03134F] text-[#F8F8F8] border-[#0452F0] shadow-[4px_4px_0px_#02B75E]"
                            : "bg-[#C5E5FF] text-[#03134F] border-[#03134F] hover:bg-[#EAB308]"
                        }`}
                      >
                        <div>
                          <p className="font-black text-sm">{vibe.id}</p>
                          <p
                            className={`text-xs font-semibold ${
                              isSelected ? "text-[#C5E5FF]" : "text-[#03134F]"
                            }`}
                          >
                            {vibe.tagline}
                          </p>
                        </div>
                        <span
                          className={`w-7 h-7 rounded-full border-2 ${vibe.swatchBg} ${vibe.swatchBorder} shrink-0`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Q9: Volunteered / Hub / Award Nomination / Challenge (Optional) */}
              <div>
                <p className="block text-sm font-black text-[#03134F] mb-2">
                  9. Did you volunteer or take part in any state hub, award
                  nomination or challenge this season?{" "}
                  <span className="text-xs font-bold text-[#0452F0]">
                    (Optional — adds Community Champion badge)
                  </span>
                </p>
                <div className="flex items-center gap-4">
                  {(["Yes", "No"] as const).map((ans) => {
                    const isSelected = volunteered === ans;
                    return (
                      <label
                        key={ans}
                        className={`px-6 py-2.5 rounded-xl border-2 cursor-pointer text-sm font-black transition-colors ${
                          isSelected
                            ? "bg-[#02B75E] text-[#03134F] border-[#03134F] shadow-[3px_3px_0px_#03134F]"
                            : "bg-[#C5E5FF] text-[#03134F] border-[#03134F] hover:bg-[#EAB308]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="volunteered"
                          value={ans}
                          checked={isSelected}
                          onChange={() => setVolunteered(ans)}
                          className="sr-only"
                        />
                        <span>{ans}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q10: Consent Checkbox (Required) */}
              <div className="pt-2 border-t-2 border-[#C5E5FF]">
                <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#C5E5FF] border-2 border-[#03134F] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="w-5 h-5 mt-0.5 accent-[#0452F0] shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-black text-[#03134F] leading-snug">
                    10. I agree to ALX using my name and photo on my card and
                    sharing it if I post it{" "}
                    <span className="text-[#0452F0]">*</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY LIVE CARD PREVIEW & PNG DOWNLOAD */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
            <div className="w-full bg-[#F8F8F8] text-[#03134F] rounded-3xl p-5 sm:p-6 border-4 border-[#EAB308] shadow-[10px_10px_0px_#02B75E]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="bg-[#03134F] text-[#EAB308] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    LIVE CARD PREVIEW
                  </span>
                  <h3 className="text-lg font-black text-[#03134F] mt-1">
                    Vibe: {cardVibe}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#0452F0]">
                  1080 × 1350 PNG
                </span>
              </div>

              {/* Responsive Canvas Container */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#03134F] bg-[#03134F] mb-5">
                <canvas
                  ref={canvasRef}
                  width={1080}
                  height={1350}
                  className="w-full h-full object-contain block"
                />
              </div>

              {/* Validation Status or Download CTA */}
              {!isReadyToDownload ? (
                <div className="bg-[#C5E5FF] border-2 border-[#03134F] rounded-2xl p-4 mb-4">
                  <p className="text-xs font-black uppercase tracking-wider text-[#0452F0] mb-1">
                    Complete Required Fields to Download:
                  </p>
                  <p className="text-xs font-bold text-[#03134F]">
                    Missing: {missingFields.join(" • ")}
                  </p>
                </div>
              ) : (
                <div className="bg-[#02B75E] text-[#03134F] border-2 border-[#03134F] rounded-2xl p-3.5 mb-4 text-xs font-black text-center">
                  ✓ Your festival card is ready! Click below to download as PNG.
                </div>
              )}

              <button
                type="button"
                disabled={!isReadyToDownload}
                onClick={handleDownloadPng}
                className={`w-full py-4 px-6 rounded-full font-black text-base border-2 border-[#03134F] transition-all flex items-center justify-center gap-2 ${
                  isReadyToDownload
                    ? "bg-[#EAB308] hover:bg-[#02B75E] text-[#03134F] shadow-[5px_5px_0px_#03134F] cursor-pointer"
                    : "bg-[#C5E5FF] text-[#03134F]/50 cursor-not-allowed"
                }`}
              >
                <span>⬇ Download My Festival Card (.PNG)</span>
              </button>

              <p className="text-[11px] font-bold text-center text-[#03134F] mt-3">
                Share on Instagram, LinkedIn, X &amp; WhatsApp with{" "}
                <span className="text-[#0452F0]">#ALXOneCommunity</span> and tag{" "}
                <span className="text-[#0452F0]">@alxnigeria</span>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
