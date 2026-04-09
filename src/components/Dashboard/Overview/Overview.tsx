"use client";

import {
  Users,
  UserCheck,
  ImageIcon,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12k",
    icon: Users,
  },
  {
    title: "Active Users",
    value: "10k",
    icon: UserCheck,
  },
  {
    title: "Total Designs",
    value: "7k",
    icon: ImageIcon,
  },
  {
    title: "Total Revenue",
    value: "$12,426",
    icon: TrendingUp,
  },
];

const barData = [26, 23, 30, 14, 25, 7, 17, 27, 32, 15, 21, 24];
const areaData = [6, 11, 9, 16, 14, 22, 19, 21, 18, 25, 17, 23, 29];
const revenueData = [10, 9, 12, 9, 15, 18, 16, 20, 17, 16, 25, 24, 27, 28, 27, 30];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Overview() {
  return (
    <section className="min-h-screen p-4 md:p-5">
      <div className="mx-auto max-w-[1500px]">
        {/* Top Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-lg border border-[#d9e7f2] bg-white px-4 py-5 shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md text-[#6b63ff]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[28px] font-semibold leading-none text-[#2d3748]">
                    {item.value}
                  </span>
                </div>
                <p className="text-[13px] font-medium text-[#6b7280]">{item.title}</p>
              </div>
            );
          })}
        </div>

        {/* Middle Charts */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ChartCard
            title="Total Users"
            subtitle="See your users per year."
          >
            <BarChart data={barData} labels={months} />
          </ChartCard>

          <ChartCard
            title="Active Users"
            subtitle="See your active users per year."
          >
            <AreaChart data={areaData} labels={months} />
          </ChartCard>
        </div>

        {/* Bottom Charts */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1.1fr]">
          <ChartCard
            title="Revenue Overview"
            subtitle="Track total revenue, platform commission, and payouts over time."
          >
            <RevenueChart data={revenueData} labels={months} />
          </ChartCard>

          <ChartCard
            title="Designs"
            subtitle="See which designs are generated the most by users."
          >
            <DonutChart />
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#d9e7f2] bg-white p-4 shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
      <h3 className="text-[16px] font-semibold text-[#2d3748]">{title}</h3>
      <p className="mb-4 mt-1 text-[11px] text-[#97a0af]">{subtitle}</p>
      {children}
    </div>
  );
}

function BarChart({
  data,
  labels,
}: {
  data: number[];
  labels: string[];
}) {
  const max = Math.max(...data);

  return (
    <div className="h-[240px]">
      <div className="flex h-[210px] items-end gap-3 border-b border-l border-[#e5e7eb] px-2 pb-2">
        {data.map((value, index) => {
          const height = `${(value / max) * 100}%`;
          return (
            <div key={index} className="flex h-full flex-1 flex-col justify-end items-center gap-2">
              <div
                className="w-full max-w-[26px] rounded-t-[4px] bg-gradient-to-b from-[#9b8cff] to-[#2aa7f6]"
                style={{ height }}
              />
              <span className="text-[10px] text-[#7b8494]">{labels[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AreaChart({
  data,
  labels,
}: {
  data: number[];
  labels: string[];
}) {
  const width = 100;
  const height = 210;
  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y =
        height - ((value - min) / (max - min || 1)) * (height - 25) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="h-[240px]">
      <div className="relative h-[210px] overflow-hidden border-b border-l border-[#e5e7eb]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={(i / 11) * width}
              y1="0"
              x2={(i / 11) * width}
              y2={height}
              stroke="#e5e7eb"
              strokeWidth="0.35"
            />
          ))}

          <polygon
            points={areaPoints}
            fill="rgba(62, 157, 238, 0.25)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#4da3f8"
            strokeWidth="1.2"
          />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex px-2">
          {labels.map((label) => (
            <div key={label} className="flex-1 text-center text-[10px] text-[#7b8494]">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RevenueChart({
  data,
  labels,
}: {
  data: number[];
  labels: string[];
}) {
  const width = 100;
  const height = 250;
  const max = Math.max(...data);
  const min = Math.min(...data);

  const pointsArray = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y =
      height - ((value - min) / (max - min || 1)) * (height - 35) - 15;
    return { x, y, value };
  });

  const points = pointsArray.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  const callout = pointsArray[5];

  return (
    <div className="h-[300px]">
      <div className="relative h-[265px] overflow-hidden border-b border-[#e5e7eb]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={(i / 5) * height}
              x2={width}
              y2={(i / 5) * height}
              stroke="#eceff3"
              strokeWidth="0.4"
            />
          ))}

          <polygon
            points={areaPoints}
            fill="rgba(123, 97, 255, 0.20)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#8f87ff"
            strokeWidth="1"
          />
          <circle cx={callout.x} cy={callout.y} r="0.8" fill="#4ade80" />
        </svg>

        <div
          className="absolute rounded-md border border-[#e5efe7] bg-white px-3 py-2 text-center shadow-sm"
          style={{
            left: `${callout.x}%`,
            top: `${(callout.y / height) * 100 - 12}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="text-[9px] text-[#98a2b3]">June 2023</p>
          <p className="text-[12px] font-semibold text-[#22c55e]">$45,591</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex px-1">
          {labels.map((label) => (
            <div key={label} className="flex-1 text-center text-[10px] text-[#7b8494]">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonutChart() {
  const logo = 35;
  const poster = 65;
  const angle = (logo / 100) * 360;

  return (
    <div className="flex h-[300px] flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div
          className="h-[180px] w-[180px] rounded-full"
          style={{
            background: `conic-gradient(#5b4ff7 0deg ${angle}deg, #bfd3e3 ${angle}deg 360deg)`,
          }}
        />
        <div className="absolute h-[110px] w-[110px] rounded-full bg-white" />
        <span className="absolute -right-8 top-3 text-[11px] text-[#6b7280]">
          35%
        </span>
        <span className="absolute -left-8 bottom-6 text-[11px] text-[#6b7280]">
          65%
        </span>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        <div className="flex items-center gap-2 text-[12px] text-[#7b8494]">
          <span className="h-3 w-3 rounded-full bg-[#bfd3e3]" />
          Poster Design
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#7b8494]">
          <span className="h-3 w-3 rounded-full bg-[#5b4ff7]" />
          Logo Design
        </div>
      </div>
    </div>
  );
}