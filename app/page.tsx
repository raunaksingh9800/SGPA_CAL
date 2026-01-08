"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/* ------------------ HELPERS ------------------ */

const emptyMarks = {
  DSA: "",
  DDCO: "",
  OS: "",
  MATH: "",
  UHV: "",
  RWD: "",
};

function loadStoredData() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("cgpa-calculator-data");
  return data ? JSON.parse(data) : null;
}

function eq(a: number, b: number, c: number) {
  return 3 * a + 2 * b + 5 * c;
}

/* ------------------ INPUT COMPONENT ------------------ */

const Mark = forwardRef<
  HTMLInputElement,
  {
    label: string;
    value: string;
    onChange: (v: string) => void;
    onEnter?: () => void;
  }
>(({ label, value, onChange, onEnter }, ref) => {
  return (
    <div className="my-4">
      <Label>{label}</Label>
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter?.();
          }
        }}
      />
    </div>
  );
});

Mark.displayName = "Mark";

/* ------------------ MAIN COMPONENT ------------------ */

export default function Home() {
  const router = useRouter();
  const stored = loadStoredData();

  const [ia1, setIa1] = useState(stored?.ia1 ?? emptyMarks);
  const [ia2, setIa2] = useState(stored?.ia2 ?? emptyMarks);
  const [assignment, setAssignment] = useState(stored?.assignment ?? emptyMarks);
  const [see, setSee] = useState(stored?.see ?? emptyMarks);
  const [cgpa, setCgpa] = useState<number | null>(stored?.cgpa ?? null);

  const refs = Array.from({ length: 24 }, () =>
    useRef<HTMLInputElement>(null)
  );

  useEffect(() => {
    localStorage.setItem(
      "cgpa-calculator-data",
      JSON.stringify({ ia1, ia2, assignment, see, cgpa })
    );
  }, [ia1, ia2, assignment, see, cgpa]);

  const calculateCGPA = () => {
    const subjectScores = {
      DSA: eq(
        (Number(ia1.DSA) + Number(ia2.DSA)) / 120,
        Number(assignment.DSA) / 20,
        Number(see.DSA) / 100
      ),
      DDCO: eq(
        (Number(ia1.DDCO) + Number(ia2.DDCO)) / 120,
        Number(assignment.DDCO) / 20,
        Number(see.DDCO) / 100
      ),
      OS: eq(
        (Number(ia1.OS) + Number(ia2.OS)) / 120,
        Number(assignment.OS) / 20,
        Number(see.OS) / 100
      ),
      MATH: eq(
        (Number(ia1.MATH) + Number(ia2.MATH)) / 120,
        Number(assignment.MATH) / 20,
        Number(see.MATH) / 100
      ),
      UHV: eq(
        (Number(ia1.UHV) + Number(ia2.UHV)) / 200,
        Number(assignment.UHV) / 20,
        Number(see.UHV) / 100
      ),
      RWD: eq(
        (Number(ia1.RWD) + Number(ia2.RWD)) / 200,
        Number(assignment.RWD) / 20,
        Number(see.RWD) / 100
      ),
    };

    const totalCredits = 18;

    const weightedSum =
      4 * subjectScores.DDCO +
      4 * subjectScores.DSA +
      3 * subjectScores.OS +
      3 * subjectScores.MATH +
      2 * subjectScores.UHV +
      2 * subjectScores.RWD;

    const calculatedCgpa = weightedSum / totalCredits;

    setCgpa(calculatedCgpa);
    router.push(`/score?s=${calculatedCgpa.toFixed(2)}`);
  };

  return (
    <div className="flex flex-col py-8 px-8 md:px-24 lg:px-[30vw]">
      <h1 className="text-center text-2xl font-medium">CGPA Calculator</h1>

      <Section title="IA 1 Marks">
        <Mark ref={refs[0]} label="DSA (60)" value={ia1.DSA} onChange={(v) => setIa1({ ...ia1, DSA: v })} onEnter={() => refs[1].current?.focus()} />
        <Mark ref={refs[1]} label="DDCO (60)" value={ia1.DDCO} onChange={(v) => setIa1({ ...ia1, DDCO: v })} onEnter={() => refs[2].current?.focus()} />
        <Mark ref={refs[2]} label="OS (60)" value={ia1.OS} onChange={(v) => setIa1({ ...ia1, OS: v })} onEnter={() => refs[3].current?.focus()} />
        <Mark ref={refs[3]} label="Math (60)" value={ia1.MATH} onChange={(v) => setIa1({ ...ia1, MATH: v })} onEnter={() => refs[4].current?.focus()} />
        <Mark ref={refs[4]} label="UHV (100%)" value={ia1.UHV} onChange={(v) => setIa1({ ...ia1, UHV: v })} onEnter={() => refs[5].current?.focus()} />
        <Mark ref={refs[5]} label="RWD (100%)" value={ia1.RWD} onChange={(v) => setIa1({ ...ia1, RWD: v })} onEnter={() => refs[6].current?.focus()} />
      </Section>

      <Separator />

      <Section title="IA 2 Marks">
        <Mark ref={refs[6]} label="DSA (60)" value={ia2.DSA} onChange={(v) => setIa2({ ...ia2, DSA: v })} onEnter={() => refs[7].current?.focus()} />
        <Mark ref={refs[7]} label="DDCO (60)" value={ia2.DDCO} onChange={(v) => setIa2({ ...ia2, DDCO: v })} onEnter={() => refs[8].current?.focus()} />
        <Mark ref={refs[8]} label="OS (60)" value={ia2.OS} onChange={(v) => setIa2({ ...ia2, OS: v })} onEnter={() => refs[9].current?.focus()} />
        <Mark ref={refs[9]} label="Math (60)" value={ia2.MATH} onChange={(v) => setIa2({ ...ia2, MATH: v })} onEnter={() => refs[10].current?.focus()} />
        <Mark ref={refs[10]} label="UHV (100%)" value={ia2.UHV} onChange={(v) => setIa2({ ...ia2, UHV: v })} onEnter={() => refs[11].current?.focus()} />
        <Mark ref={refs[11]} label="RWD (100%)" value={ia2.RWD} onChange={(v) => setIa2({ ...ia2, RWD: v })} onEnter={() => refs[12].current?.focus()} />
      </Section>

      <Separator />

      <Section title="Assignment Marks">
        <Mark ref={refs[12]} label="DSA (20)" value={assignment.DSA} onChange={(v) => setAssignment({ ...assignment, DSA: v })} onEnter={() => refs[13].current?.focus()} />
        <Mark ref={refs[13]} label="DDCO (20)" value={assignment.DDCO} onChange={(v) => setAssignment({ ...assignment, DDCO: v })} onEnter={() => refs[14].current?.focus()} />
        <Mark ref={refs[14]} label="OS (20)" value={assignment.OS} onChange={(v) => setAssignment({ ...assignment, OS: v })} onEnter={() => refs[15].current?.focus()} />
        <Mark ref={refs[15]} label="Math (20)" value={assignment.MATH} onChange={(v) => setAssignment({ ...assignment, MATH: v })} onEnter={() => refs[16].current?.focus()} />
        <Mark ref={refs[16]} label="UHV (20)" value={assignment.UHV} onChange={(v) => setAssignment({ ...assignment, UHV: v })} onEnter={() => refs[17].current?.focus()} />
        <Mark ref={refs[17]} label="RWD (20)" value={assignment.RWD} onChange={(v) => setAssignment({ ...assignment, RWD: v })} onEnter={() => refs[18].current?.focus()} />
      </Section>

      <Separator />

      <Section title="SEE Marks">
        <Mark ref={refs[18]} label="DSA (100)" value={see.DSA} onChange={(v) => setSee({ ...see, DSA: v })} onEnter={() => refs[19].current?.focus()} />
        <Mark ref={refs[19]} label="DDCO (100)" value={see.DDCO} onChange={(v) => setSee({ ...see, DDCO: v })} onEnter={() => refs[20].current?.focus()} />
        <Mark ref={refs[20]} label="OS (100)" value={see.OS} onChange={(v) => setSee({ ...see, OS: v })} onEnter={() => refs[21].current?.focus()} />
        <Mark ref={refs[21]} label="Math (100)" value={see.MATH} onChange={(v) => setSee({ ...see, MATH: v })} onEnter={() => refs[22].current?.focus()} />
        <Mark ref={refs[22]} label="UHV (100)" value={see.UHV} onChange={(v) => setSee({ ...see, UHV: v })} onEnter={() => refs[23].current?.focus()} />
        <Mark ref={refs[23]} label="RWD (100)" value={see.RWD} onChange={(v) => setSee({ ...see, RWD: v })} onEnter={calculateCGPA} />
      </Section>

      <Button className="mt-6" onClick={calculateCGPA}>
        Calculate CGPA
      </Button>
    </div>
  );
}

/* ------------------ SECTION ------------------ */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 mb-6">
      <h2 className="text-xl font-medium">{title}</h2>
      {children}
    </div>
  );
}
