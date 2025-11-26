"use client";
import * as React from "react";
import {
  IconCalendarEvent,
  IconHome,
  IconLeaf,
  IconPackageImport,
  IconRecycle,
  IconTruckDelivery,
  IconUpload,
} from "@tabler/icons-react";

import Canvas from "@/canvas";
import state from "@/store";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FloatingDock } from "@/components/ui/floating-dock";
import STLViewer from "@/components/STLViewer";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import BookingCard from "@/components/BookingCard";

const heroStats = [
  { label: "Avg. STL turnaround", value: "24 hrs" },
  { label: "Families making toys", value: "1k+" },
  { label: "Recycled plastic saved", value: "3 tons" },
];

const ecoHighlights = [
  {
    title: "Recyclable plastics only",
    copy: "Kid-safe PLA and PETG blends give every toy a second life once playtime is over.",
    icon: IconLeaf,
  },
  {
    title: "Closed-loop pellets",
    copy: "Shredded returns become new filament so our Christmas drop stays circular.",
    icon: IconRecycle,
  },
  {
    title: "Solar-powered print hubs",
    copy: "Regional farms in six cities keep freight short and emissions tiny.",
    icon: IconHome,
  },
  {
    title: "Keepsake-ready packaging",
    copy: "Compostable gift boxes arrive ready to place under the tree.",
    icon: IconPackageImport,
  },
];

const deliveryTimeline = [
  {
    title: "Sketch or upload",
    copy: "Share a doodle, family drawing, or reference toy. AI cleans it automatically.",
    icon: IconUpload,
  },
  {
    title: "AI sculpts in 3D",
    copy: "Our model builds watertight STL concepts you can view in 360°.",
    icon: IconCalendarEvent,
  },
  {
    title: "Approve & personalize",
    copy: "Choose colors, name engravings, or playful accessories before printing.",
    icon: IconPackageImport,
  },
  {
    title: "Print & deliver",
    copy: "Eco filament gets printed, polished, and shipped in holiday-ready boxes.",
    icon: IconTruckDelivery,
  },
];

const galleryItems = [
  {
    title: "Apple 3D Model",
    copy: "A beautifully designed apple model created by our community makers.",
    src: "/apple+3d+model.stl",
    color: "#EF4444",
  },
  {
    title: "Roblox Character",
    copy: "Custom Roblox-inspired character model ready for 3D printing.",
    src: "/roblox v8.stl",
    color: "#10B981",
  },
  {
    title: "Stylized Character",
    copy: "Unique stylized character design perfect for toy creation.",
    src: "/stylized+character+3d+model.stl",
    color: "#3B82F6",
  },
];

const makerStories = [
  {
    quote:
      "My twins scribbled a rocket fox and 18 hours later we were holding it. Nothing beats watching them paint their own heroes.",
    name: "Clem",
    designation: "Mama + Toy Inventor",
    src: "https://res.cloudinary.com/dbs7m6ljl/image/upload/v1763666784/IMG_0988_xqyrsb.jpg",
  },
  {
    quote:
      "Our classroom recycled old filament spools into stocking stuffers. The lifecycle card turned every fifth grader into a sustainability nerd.",
    name: "Mr. Pius",
    designation: "5th Grade Teacher",
    src: "https://res.cloudinary.com/dbs7m6ljl/image/upload/v1763666881/IMG_0985_swyi11.jpg",
  },
  {
    quote:
      "Our classroom recycled old filament spools into stocking stuffers. The lifecycle card turned every fifth grader into a sustainability nerd.",
    name: "Mr. Pius",
    designation: "5th Grade Teacher",
    src: "https://res.cloudinary.com/dbs7m6ljl/image/upload/v1763666881/IMG_0985_swyi11.jpg",
  },
  {
    quote:
      "I sketched a jellyfish buddy for my niece overseas. The STL preview let us tweak smiles together before it ever shipped.",
    name: "Clem",
    designation: "Fave Auntie",
    src: "https://res.cloudinary.com/dbs7m6ljl/image/upload/v1763666784/IMG_0988_xqyrsb.jpg",
  },
];

const navItems = [
  {
    name: "Hero",
    link: "#hero",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Eco",
    link: "#gallery",
    icon: <IconLeaf className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Delivery",
    link: "#book-demo",
    icon: (
      <IconTruckDelivery className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "Book Demo",
    link: "#book-demo",
    icon: (
      <IconCalendarEvent className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

const Home = () => {
  const handleStartCustomization = () => {
    state.intro = false;
  };

  return (
    <div className="relative flex flex-col gap-20 bg-gradient-to-b from-slate-50 to-white pb-32 pt-16">
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 md:inset-x-auto md:inset-y-0 md:left-6 md:top-1/2 md:bottom-auto md:px-0">
        <div className="pointer-events-auto flex w-full max-w-sm justify-center md:max-w-none md:-translate-y-1/2">
          <FloatingDock
            items={navItems}
            desktopClassName="shadow-[0_20px_60px_-25px_rgba(0,0,0,0.45)] border border-white/40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg"
            mobileClassName="w-full shadow-lg border border-white/50 bg-white/90 backdrop-blur-xl"
          />
        </div>
      </div>

      <section
        id="hero"
        className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-28">
          <div className="relative h-[160%] w-[160vw]">
            <BackgroundRippleEffect rows={11} cols={40} cellSize={46} />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white" />
          </div>
        </div>
        <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
                Create your own toys for Christmas
              </p>
              <div className="space-y-4 text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl lg:text-6xl">
                <p>Holiday toys that feel</p>
                <ContainerTextFlip
                  words={["playful", "sustainable", "heartfelt", "limitless"]}
                  className="bg-white/80 text-neutral-900 dark:text-white"
                />
              </div>
              <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
                PichaPrintAI lets kids at heart sketch a dream toy and
                watch AI sculpt a 3D-printable model in minutes. Celebrate togetherness,
                keep plastics in circulation, and surprise loved ones with toys born
                from their own imagination.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleStartCustomization}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-neutral-800"
                >
                  <IconUpload className="h-5 w-5" />
                  Upload a sketch
                </button>
               
              </div>
              <dl className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm"
                  >
                    <dt className="text-xs uppercase tracking-wide text-neutral-500">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-semibold text-neutral-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex-1">
              <div className="relative h-[420px] w-full">
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-emerald-200/50 via-white/60 to-slate-100 blur-2xl" />
                <div className="relative h-full overflow-hidden rounded-[32px] border border-white/80 bg-white/70 p-3 shadow-2xl backdrop-blur">
                  <div className="h-full w-full rounded-[28px] border border-white/40 bg-gradient-to-br from-slate-950/90 to-slate-700/80">
                    <Canvas />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-t from-black/10 via-transparent" />
                  
                </div>
              </div>
            </div>
          </div>
      </section>

      <section
        id="gallery"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-[32px] border border-neutral-200 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Recent maker designs
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
                A peek at toys the community dreamed up this week
              </h2>
              
            </div>
            <a
              href="#book-demo"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-5 py-2 font-semibold text-neutral-900 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              See how it works
            </a>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <CardContainer
                key={item.title}
                containerClassName="py-0 hidden md:flex w-full"
                className="w-full h-full"
              >
                <CardBody className="bg-white/90 relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-neutral-100 !h-auto !w-full rounded-3xl border shadow-sm overflow-hidden transition-shadow duration-300">
                  <CardItem
                    translateZ="100"
                    className={`${item.src.endsWith('.stl') ? 'h-80 md:h-96' : 'h-60'} w-full bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-t-3xl relative group-hover/card:shadow-xl`}
                  >
                    {item.src.endsWith('.stl') ? (
                      <STLViewer
                        url={item.src}
                        color={item.color || "#EFBD48"}
                        className="h-full w-full"
                        autoRotate={true}
                        zoom={3}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full object-cover rounded-t-3xl"
                      />
                    )}
                  </CardItem>
                  <div className="px-5 py-4 space-y-2">
                    <CardItem
                      translateZ="50"
                      className="text-lg font-semibold text-neutral-900 dark:text-white"
                    >
                      {item.title}
                    </CardItem>
                    <CardItem
                      translateZ="60"
                      as="p"
                      className="text-sm text-neutral-600 dark:text-neutral-300"
                    >
                      {item.copy}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
            {galleryItems.map((item) => (
              <article
                key={`${item.title}-mobile`}
                className="group rounded-3xl border border-neutral-100 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg overflow-hidden md:hidden"
              >
                <div className={`${item.src.endsWith('.stl') ? 'h-80' : 'h-60'} w-full bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-t-3xl relative`}>
                  {item.src.endsWith('.stl') ? (
                    <STLViewer
                      url={item.src}
                      color={item.color || "#EFBD48"}
                      className="h-full w-full"
                      autoRotate={true}
                      zoom={3}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="space-y-2 px-5 py-4">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-[28px] border border-neutral-100 bg-neutral-50/70">
            <AnimatedTestimonials testimonials={makerStories} autoplay />
          </div>
        </div>
      </section>

      <section
        id="eco"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-8 rounded-[32px] border border-emerald-100 bg-emerald-50/60 p-8 shadow-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
              Eco-friendly toy lab
            </p>
            <h2 className="text-3xl font-semibold text-emerald-900 sm:text-4xl">
              Materials and printers tuned for greener play
            </h2>
            <p className="text-base text-emerald-900/80">
              Every Create Your Own Toys kit uses recycled pellets, solvent-free
              finishing, and energy from renewables. Parents get a lifecycle card
              describing how to recycle or reprint the toy when it&apos;s outgrown.
            </p>
            <ul className="space-y-4 text-emerald-900/90">
              <li>• Verified no-VOC paints and kid-safe PLA</li>
              <li>• Heat-map analytics show plastic saved per toy</li>
              <li>• Return-to-reprint labels in every holiday box</li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ecoHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <article
                  key={highlight.title}
                  className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-md"
                >
                  <Icon className="mb-4 h-8 w-8 text-emerald-500" />
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    {highlight.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="book-demo"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Holiday fulfillment
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
              From idea to tree-ready toy without the chaos
            </h2>
            <p className="max-w-3xl text-neutral-600">
              Our fulfillment stack keeps every STL safe, printed, and wrapped
              before Santa arrives. Families see each step, while we handle AI
              sculpting, QA, and shipping.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ol className="space-y-6">
              {deliveryTimeline.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="flex gap-5 rounded-3xl border border-neutral-100 bg-neutral-50/60 p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <StepIcon className="h-5 w-5 text-neutral-500" />
                        <h3 className="text-lg font-semibold text-neutral-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-neutral-600">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="flex items-center justify-center">
              <BookingCard />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;