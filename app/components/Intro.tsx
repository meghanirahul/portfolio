import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

interface Cell extends HTMLDivElement {
  center_position?: { x: number, y: number };
  pulled?: boolean;
}

export function Intro() {
  const gridRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const clickedRef = useRef(false);
  const resetAllRef = useRef(false);

  const cellsRef = useRef<(Cell | null)[]>([]);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pullDistance = 70;

  const [xMax, setXMax] = useState(17);
  const [yMax, setYMax] = useState(53);

  const updateCellPositions = () => {
    cellsRef.current.forEach((cell) => {
      if (!cell) return;

      const rect = cell.getBoundingClientRect();
      cell.center_position = {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
      };
    });
  };

  const handlePointerMove = (e: { pageX: number; pageY: number } = { pageX: -pullDistance, pageY: -pullDistance }) => {
    if (clickedRef.current) return;

    const pointer_x = e.pageX;
    const pointer_y = e.pageY;

    cellsRef.current.forEach((cell) => {
      if (!cell || !cell.center_position) return;

      const diff_x = pointer_x - cell.center_position.x;
      const diff_y = pointer_y - cell.center_position.y;
      const distance = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

      if (distance < pullDistance) {
        const percent = distance / pullDistance;
        cell.pulled = true;

        gsap.to(cell, {
          duration: 0.2,
          x: diff_x * percent,
          y: diff_y * percent,
        });
      } else {
        if (!cell.pulled) return;

        cell.pulled = false;

        gsap.to(cell, {
          duration: 1,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
        });
      }
    });

    if (resetAllRef.current) {
      resetAllRef.current = false;

      gsap.to(cellsRef.current, {
        duration: 1,
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  const handleCellClick = (i: number) => {
    if (clickedRef.current || !ctxRef.current) return;
    const ctx = ctxRef.current;

    clickedRef.current = true;

    ctx.add(() => {
      const rowsCount = rowsRef.current.length;
      const colsCount = rowsRef.current[0]?.children?.length || 0;

      gsap.to(cellsRef.current, {
        duration: 1.6,
        physics2D: {
          velocity: "random(400, 1000)",
          angle: "random(250, 290)",
          gravity: 2000,
        },
        stagger: {
          grid: [rowsCount, colsCount],
          from: i,
          amount: 0.3,
        },
        onComplete: function () {
          this.timeScale(-1.3);
        },
        onReverseComplete: () => {
          clickedRef.current = false;
          resetAllRef.current = true;
          handlePointerMove();
        },
      });
    });
  };

  // ✅ update grid count based on screen
  useEffect(() => {
    const updateGridSize = () => {
      const x = Math.floor(window.innerHeight / 36);
      const y = Math.floor(window.innerWidth / 36);

      setXMax(x || 17);
      setYMax(y || 53);
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);

    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  // ✅ rebind DOM nodes when xMax/yMax changes
  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    ctxRef.current = gsap.context(() => {
      rowsRef.current = Array.from(gridEl.querySelectorAll(".row")) as HTMLDivElement[];
      cellsRef.current = Array.from(gridEl.querySelectorAll(".cell")) as Cell[];

      updateCellPositions();
    }, mainRef);
    const ctx = ctxRef.current;

    const onResize = () => {
      ctx.add(() => updateCellPositions());
    };
    const onPointerMove = (e: Event) => {
      ctx.add(() => handlePointerMove(e as unknown as { pageX: number; pageY: number }));
    };
    const onPointerLeave = () => {
      ctx.add(() => handlePointerMove());
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    document.body.addEventListener("pointerleave", onPointerLeave);

    return () => {
      ctx.revert(); // Cleanup GSAP animations
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [xMax, yMax]);

  return (
    <div ref={mainRef} className="main__intro">
      <div ref={gridRef} className="grid h-full">
        {Array.from({ length: xMax }).map((_, x) => (
          <div className="row" key={x}>
            {Array.from({ length: yMax }).map((_, y) => {
              const index = x * yMax + y;

              return (
                <div
                  key={y}
                  className="cell"
                  data-x={x}
                  data-y={y}
                  onPointerUp={() => handleCellClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Hero Overlay */}
      <div className="absolute inset-[100px] z-20 pointer-events-none flex rounded-3xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex-1 flex flex-col justify-center p-12 pointer-events-auto">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent mb-6">
            Expert Shopify & AI App Developer
          </h1>
          <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
            Specializing in high-performance e-commerce solutions for global brands.
            From custom GraphQL apps to AI-driven discovery, I build the features
            Shopify doesn't provide out of the box.
          </p>
        </div>
        <div className="flex-1 relative pointer-events-auto">
          <img
            src="https://placehold.co/800x800/1a1a1a/FFF?text=Hero+Image"
            alt="Hero Visual"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
