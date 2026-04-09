"use client";

import React, { useState } from "react";
import {
  Users,
  UserCheck,
  ImageIcon,
  TrendingUp,
} from "lucide-react";
import { useAnalytics } from "../hooks/useOverView";
import { Skeleton } from "@/components/ui/skeleton";


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Overview() {
  const { data: response, isLoading } = useAnalytics();
  const analytics = response?.data;

  // Helper to map monthly stats to 12-month array
  const mapMonthlyData = <T extends { _id: { month: number } }>(stats: T[], key: keyof T) => {
    const data = Array(12).fill(0);
    stats?.forEach(stat => {
      const monthIndex = stat._id.month - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        const value = stat[key];
        if (typeof value === "number") {
          data[monthIndex] = value;
        }
      }
    });
    return data;
  };

  const topStats = [
    {
      title: "Total Users",
      value: analytics?.totalUsers?.toLocaleString() || "0",
      icon: Users,
    },
    {
      title: "Total Poster Designs",
      value: analytics?.totalPosterDesigns || 0,
      icon: UserCheck,
    },
    {
      title: "Total Logo Designs",
      value: analytics?.totalLogoDesigns || 0,
      icon: ImageIcon,
    },
    {
      title: "Total Revenue",
      value: `$${analytics?.totalRevenue?.toLocaleString() || "0"}`,
      icon: TrendingUp,
    },
  ];

  const barData = mapMonthlyData(analytics?.subscribedUsersStats || [], "count");
  const areaData = analytics?.yearlyAnalytics?.[0]
    ? [0, 0, 0, analytics.yearlyAnalytics[0].activeUsers, 0, 0, 0, 0, 0, 0, 0, 0] // Fallback for active users if not monthly
    : Array(12).fill(0);

  // Using subscribed users stats as a proxy for monthly activity distribution if yearly analytics isn't monthly
  const activeUsersData = mapMonthlyData(analytics?.subscribedUsersStats || [], "count");

  const revenueData = mapMonthlyData(analytics?.revenueStats || [], "totalRevenue");

  if (isLoading) {
    return (
      <section className="min-h-screen p-4 md:p-5">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1.1fr]">
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 md:p-5">
      <div className="mx-auto max-w-[1500px]">
        {/* Top Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {topStats.map((item) => {
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
            title="Subscribed Users"
            subtitle="Monthly distribution of subscribed users."
          >
            <BarChart data={barData} labels={months} />
          </ChartCard>

          <ChartCard
            title="User Activity"
            subtitle="Monthly distribution of users."
          >
            <AreaChart data={activeUsersData} labels={months} />
          </ChartCard>
        </div>

        {/* Bottom Charts */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1.1fr]">
          <ChartCard
            title="Revenue Overview"
            subtitle="Track total revenue over time."
          >
            <RevenueChart data={revenueData} labels={months} />
          </ChartCard>

          <ChartCard
            title="Designs"
            subtitle="Distribution of poster vs logo designs."
          >
            <DonutChart
              posterCount={analytics?.totalPosterDesigns || 0}
              logoCount={analytics?.totalLogoDesigns || 0}
            />
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const max = Math.max(...data, 1);

  return (
    <div className="h-[240px]">
      <div className="relative flex h-[210px] items-end gap-3 border-b border-l border-[#e5e7eb] px-2 pb-2">
        {data.map((value, index) => {
          const height = `${(value / max) * 100}%`;
          return (
            <div 
              key={index} 
              className="group relative flex h-full flex-1 flex-col justify-end items-center gap-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {hoveredIndex === index && (
                <div className="absolute -top-12 z-10 rounded-md bg-[#2d3748] px-2 py-1 text-center shadow-lg transition-all duration-200">
                  <p className="text-[10px] text-white/70">{labels[index]}</p>
                  <p className="whitespace-nowrap text-[12px] font-bold text-white">{value.toLocaleString()}</p>
                  {/* Arrow */}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#2d3748]" />
                </div>
              )}

              <div
                className={`w-full max-w-[26px] rounded-t-[4px] bg-gradient-to-b from-[#9b8cff] to-[#2aa7f6] transition-all duration-300 ${
                  hoveredIndex === index ? "brightness-110" : "opacity-90"
                }`}
                style={{ height }}
              />
              <span className={`text-[10px] transition-colors ${
                hoveredIndex === index ? "text-[#2d3748] font-semibold" : "text-[#7b8494]"
              }`}>
                {labels[index]}
              </span>
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
  const [hoverData, setHoverData] = useState<{ x: number; y: number; value: number; index: number } | null>(null);
  const width = 100;
  const height = 210;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);

  const pointsArray = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y =
      height - ((value - min) / (max - min || 1)) * (height - 35) - 15;
    return { x, y, value, index };
  });

  const points = pointsArray.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    
    // Find nearest point
    const nearest = pointsArray.reduce((prev, curr) => 
      Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev
    );
    
    setHoverData(nearest);
  };

  return (
    <div className="h-[240px]">
      <div className="relative h-[210px] overflow-hidden border-b border-l border-[#e5e7eb]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverData(null)}
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

          <polygon points={areaPoints} fill="rgba(62, 157, 238, 0.2)" />
          <polyline
            points={points}
            fill="none"
            stroke="#4da3f8"
            strokeWidth="1.2"
          />

          {hoverData && (
            <>
              <line 
                x1={hoverData.x} y1="0" x2={hoverData.x} y2={height} 
                stroke="#4da3f8" strokeWidth="0.5" strokeDasharray="2,2" 
              />
              <circle cx={hoverData.x} cy={hoverData.y} r="1.5" fill="#4da3f8" stroke="white" strokeWidth="0.5" />
            </>
          )}
        </svg>

        {hoverData && (
          <div 
            className="pointer-events-none absolute z-20 rounded-md border border-slate-100 bg-white p-2 shadow-lg"
            style={{
              left: `${hoverData.x}%`,
              top: `${(hoverData.y / height) * 100 - 15}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="text-[10px] font-medium text-slate-500">{labels[hoverData.index]}</p>
            <p className="text-[12px] font-bold text-[#2d3748]">{hoverData.value.toLocaleString()}</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex px-2">
          {labels.map((label, i) => (
            <div key={i} className="flex-1 text-center text-[10px] text-[#7b8494]">
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
  const [hoverData, setHoverData] = useState<{ x: number; y: number; value: number; index: number } | null>(null);
  const width = 100;
  const height = 250;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);

  const pointsArray = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y =
      height - ((value - min) / (max - min || 1)) * (height - 35) - 15;
    return { x, y, value, index };
  });

  const points = pointsArray.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    
    const nearest = pointsArray.reduce((prev, curr) => 
      Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev
    );
    
    setHoverData(nearest);
  };

  return (
    <div className="h-[300px]">
      <div className="relative h-[265px] overflow-hidden border-b border-[#e5e7eb]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverData(null)}
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
          {hoverData && (
            <>
               <line 
                x1={hoverData.x} y1="0" x2={hoverData.x} y2={height} 
                stroke="#8f87ff" strokeWidth="0.5" strokeDasharray="2,2" 
              />
              <circle cx={hoverData.x} cy={hoverData.y} r="0.8" fill="#4ade80" stroke="white" strokeWidth="0.2" />
            </>
          )}
        </svg>

        {hoverData && (
          <div
            className="pointer-events-none absolute z-20 rounded-md border border-[#e5efe7] bg-white px-3 py-2 text-center shadow-lg"
            style={{
              left: `${hoverData.x}%`,
              top: `${(hoverData.y / height) * 100 - 12}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="whitespace-nowrap text-[9px] font-medium text-[#98a2b3]">{labels[hoverData.index]} Revenue</p>
            <p className="text-[12px] font-bold text-[#22c55e]">${hoverData.value.toLocaleString()}</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex px-1">
          {labels.map((label, i) => (
            <div key={i} className="flex-1 text-center text-[10px] text-[#7b8494]">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonutChart({ posterCount, logoCount }: { posterCount: number; logoCount: number }) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const total = posterCount + logoCount;
  const logoPercentage = total > 0 ? (logoCount / total) * 100 : 0;
  const posterPercentage = total > 0 ? 100 - logoPercentage : 0;
  
  // SVG properties
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const logoOffset = 0;
  const posterOffset = (logoPercentage / 100) * circumference;

  return (
    <div className="flex h-[300px] flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="rotate-[-90deg]">
          {/* Logo Design Segment */}
          {logoCount > 0 && (
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#5b4ff7"
              strokeWidth="25"
              strokeDasharray={`${(logoPercentage / 100) * circumference} ${circumference}`}
              strokeDashoffset={-logoOffset}
              className="cursor-pointer transition-all duration-300 hover:brightness-110"
              onMouseEnter={() => setHoveredSegment("Logo")}
              onMouseLeave={() => setHoveredSegment(null)}
              style={{ strokeWidth: hoveredSegment === "Logo" ? 30 : 25 }}
            />
          )}
          {/* Poster Design Segment */}
          {posterCount > 0 && (
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#bfd3e3"
              strokeWidth="25"
              strokeDasharray={`${(posterPercentage / 100) * circumference} ${circumference}`}
              strokeDashoffset={-posterOffset}
              className="cursor-pointer transition-all duration-300 hover:brightness-110"
              onMouseEnter={() => setHoveredSegment("Poster")}
              onMouseLeave={() => setHoveredSegment(null)}
              style={{ strokeWidth: hoveredSegment === "Poster" ? 30 : 25 }}
            />
          )}
        </svg>

        {/* Center label or Tooltip */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          {hoveredSegment ? (
            <>
              <span className="text-[12px] font-medium text-slate-500">{hoveredSegment}</span>
              <span className="text-[20px] font-bold text-[#2d3748]">
                {hoveredSegment === "Logo" ? logoCount : posterCount}
              </span>
              <span className="text-[11px] text-[#6b7280]">
                {Math.round(hoveredSegment === "Logo" ? logoPercentage : posterPercentage)}%
              </span>
            </>
          ) : (
            <>
              <span className="text-[12px] font-medium text-slate-500">Total</span>
              <span className="text-[20px] font-bold text-[#2d3748]">{total}</span>
              <span className="text-[11px] text-[#6b7280]">Designs</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        <div 
          className={`flex items-center gap-2 text-[12px] transition-all duration-200 ${
            hoveredSegment === "Poster" ? "font-bold text-[#2d3748] scale-105" : "text-[#7b8494]"
          }`}
          onMouseEnter={() => setHoveredSegment("Poster")}
          onMouseLeave={() => setHoveredSegment(null)}
        >
          <span className="h-3 w-3 rounded-full bg-[#bfd3e3]" />
          Poster Design ({posterCount})
        </div>
        <div 
          className={`flex items-center gap-2 text-[12px] transition-all duration-200 ${
            hoveredSegment === "Logo" ? "font-bold text-[#2d3748] scale-105" : "text-[#7b8494]"
          }`}
          onMouseEnter={() => setHoveredSegment("Logo")}
          onMouseLeave={() => setHoveredSegment(null)}
        >
          <span className="h-3 w-3 rounded-full bg-[#5b4ff7]" />
          Logo Design ({logoCount})
        </div>
      </div>
    </div>
  );
}