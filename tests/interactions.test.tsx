import "./setup.mjs";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  act,
  cleanup,
  fireEvent,
  render,
  within,
  waitFor,
} from "@testing-library/react";
import { Coursework } from "../src/components/coursework";
import { ExperienceList } from "../src/components/experience-list";
import { FeaturedProjects } from "../src/components/featured-projects";
import { SkillKeycaps } from "../src/components/skill-keycaps";
import { CertificateStack } from "../src/components/certificate-stack";
import { PaperBookshelf } from "../src/components/paper-bookshelf";
import { RESUME_DATA } from "../src/data/resume-data";
import { entryId } from "../src/lib/skill-links";

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
});

test("coursework expands all courses and restores the selected list", () => {
  const view = render(
    <Coursework
      selected={["Algorithms", "Databases"]}
      all="Algorithms, Databases, Real Analysis"
    />,
  );
  assert.equal(
    view.queryByText(/Real Analysis/, { selector: "p:not(.hidden)" }),
    null,
  );
  fireEvent.click(view.getByRole("button", { name: "All coursework" }));
  assert.match(view.getByRole("button").getAttribute("aria-expanded")!, /true/);
  assert.ok(view.getByText(/Real Analysis/, { selector: "p:not(.hidden)" }));
  fireEvent.click(view.getByRole("button", { name: "Selected coursework" }));
  assert.equal(view.getByRole("button").getAttribute("aria-expanded"), "false");
});

test("projects show three initially, expand above the toggle, and retain unique anchors", () => {
  const view = render(<FeaturedProjects projects={RESUME_DATA.projects} />);
  assert.equal(view.getAllByRole("heading", { level: 3 }).length, 3);
  fireEvent.click(view.getByRole("button", { name: "Show more" }));
  assert.equal(
    view.getAllByRole("heading", { level: 3 }).length,
    RESUME_DATA.projects.length,
  );
  const ids = Array.from(
    view.container.querySelectorAll('[id^="project-"]'),
  ).map((e) => e.id);
  assert.equal(new Set(ids).size, ids.length);
  fireEvent.click(view.getByRole("button", { name: "Show fewer" }));
  assert.equal(view.getAllByRole("heading", { level: 3 }).length, 3);
});

function experienceFixture() {
  return render(
    <ExperienceList
      entryIds={RESUME_DATA.work.map((work) =>
        entryId("experience", work.company),
      )}
    >
      {RESUME_DATA.work.map((work) => (
        <h3 key={work.company}>{work.company}</h3>
      ))}
    </ExperienceList>,
  );
}

test("experience expansion keeps print copies from duplicating anchors", () => {
  const view = experienceFixture();
  assert.equal(view.getAllByRole("heading").length, 3);
  fireEvent.click(
    view.getByRole("button", { name: "Show more experience entries" }),
  );
  assert.equal(view.getAllByRole("heading").length, RESUME_DATA.work.length);
  assert.equal(
    view.container.querySelectorAll("#experience-iomics-corporation").length,
    1,
  );
  fireEvent.click(
    view.getByRole("button", { name: "Show fewer experience entries" }),
  );
  assert.equal(view.getAllByRole("heading").length, 3);
});

test("an initial deep link reveals and focuses a hidden experience", async () => {
  window.history.replaceState(null, "", "#experience-iomics-corporation");
  const view = experienceFixture();
  await waitFor(() =>
    assert.equal(
      view.getByRole("button").getAttribute("aria-expanded"),
      "true",
    ),
  );
  await waitFor(() =>
    assert.equal(document.activeElement?.id, "experience-iomics-corporation"),
  );
});

test("a project hash reveals an entry outside the featured three", async () => {
  const view = render(<FeaturedProjects projects={RESUME_DATA.projects} />);
  act(() => {
    window.history.replaceState(null, "", "#project-mortgage-markets");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  assert.ok(view.getByRole("heading", { name: "Mortgage Markets" }));
  await waitFor(() =>
    assert.equal(document.activeElement?.id, "project-mortgage-markets"),
  );
});

test("changing to another section cancels a pending project focus jump", async () => {
  render(<FeaturedProjects projects={RESUME_DATA.projects} />);
  act(() => {
    window.history.replaceState(null, "", "#project-mortgage-markets");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.history.replaceState(null, "", "#education");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 360));
  });
  assert.equal(
    document.activeElement?.id === "project-mortgage-markets",
    false,
  );
});

function skillFixture() {
  return render(
    <SkillKeycaps
      groups={RESUME_DATA.skillGroups}
      projects={RESUME_DATA.projects}
      experiences={RESUME_DATA.work}
    />,
  );
}

test("selecting a key changes category and Escape restores Languages", () => {
  const view = skillFixture();
  fireEvent.click(view.getByRole("button", { name: "Docker" }));
  assert.equal(
    view
      .getByRole("button", { name: "Data & Cloud" })
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(
    view.getByRole("button", { name: "Python" }).getAttribute("data-dimmed"),
    "true",
  );
  fireEvent.keyDown(view.getByRole("button", { name: "Docker" }), {
    key: "Escape",
  });
  assert.equal(
    view
      .getByRole("button", { name: "Languages" })
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(
    view.getByRole("button", { name: "Docker" }).getAttribute("aria-pressed"),
    "false",
  );
});

test("requested skill links include every shared experience and the individual overrides", () => {
  const view = skillFixture();
  for (const skill of ["Git", "GitHub", "REST APIs"]) {
    fireEvent.click(view.getByRole("button", { name: skill }));
    for (const work of RESUME_DATA.work)
      assert.ok(view.getByRole("link", { name: work.company }));
  }
  for (const [skill, expected] of [
    ["Linux", "Cisco Meraki"],
    ["Postman", "MAMS SISO"],
    ["Bazel", "Stripe"],
    ["Docker", "Palantir Technologies"],
    ["JavaScript", "Stripe"],
    ["Go", "Stripe"],
    ["Spark", "Palantir Technologies"],
    ["MATLAB", "MatLab Image Processing"],
    ["LaTeX", "Papers"],
    ["C++", "Coursework"],
  ]) {
    fireEvent.click(view.getByRole("button", { name: skill }));
    assert.ok(
      view.getByRole("link", { name: expected }),
      `${skill} should link to ${expected}`,
    );
  }
});

test("skill aliases match ReactJS, NodeJS and ExpressJS project tags", () => {
  const view = skillFixture();
  for (const skill of ["React", "Node.js", "Express.js"]) {
    fireEvent.click(view.getByRole("button", { name: skill }));
    assert.ok(view.getByRole("link", { name: "MAMS SISO" }));
  }
});

test("certificate keyboard navigation wraps and supports Home/End", () => {
  const view = render(
    <CertificateStack certificates={RESUME_DATA.certificates} />,
  );
  const stack = view.getByRole("group", { name: "Certificate letter stack" });
  const title = () =>
    view.container
      .querySelector('.credential-sheet[data-front="true"]')
      ?.getAttribute("aria-label");
  fireEvent.keyDown(stack, { key: "ArrowLeft" });
  assert.equal(title(), RESUME_DATA.certificates.at(-1)?.title);
  fireEvent.keyDown(stack, { key: "ArrowRight" });
  assert.equal(title(), RESUME_DATA.certificates[0].title);
  fireEvent.keyDown(stack, { key: "End" });
  assert.equal(title(), RESUME_DATA.certificates.at(-1)?.title);
  fireEvent.keyDown(stack, { key: "Home" });
  assert.equal(title(), RESUME_DATA.certificates[0].title);
});

test("MATLAB hash brings its certificate to the front", async () => {
  window.history.replaceState(null, "", "#certificate-matlab-image-processing");
  const view = render(
    <CertificateStack certificates={RESUME_DATA.certificates} />,
  );
  await waitFor(() =>
    assert.equal(
      view.container
        .querySelector('.credential-sheet[data-front="true"]')
        ?.getAttribute("aria-label"),
      "MatLab Image Processing",
    ),
  );
});

test("certificate swipe advances and vertical or pinch scrolling stays native", () => {
  const view = render(
    <CertificateStack certificates={RESUME_DATA.certificates} />,
  );
  const stack = view.getByRole("group", { name: "Certificate letter stack" });
  fireEvent.touchStart(stack, { touches: [{ clientX: 150, clientY: 100 }] });
  fireEvent.touchEnd(stack, {
    changedTouches: [{ clientX: 80, clientY: 100 }],
  });
  assert.equal(
    view.container
      .querySelector('.credential-sheet[data-front="true"]')
      ?.getAttribute("aria-label"),
    RESUME_DATA.certificates[1].title,
  );
  assert.equal(
    fireEvent.wheel(stack, { deltaX: 100, deltaY: 0, cancelable: true }),
    false,
  );
  assert.equal(
    fireEvent.wheel(stack, { deltaX: 0, deltaY: 100, cancelable: true }),
    true,
  );
  assert.equal(
    fireEvent.wheel(stack, { deltaX: 100, ctrlKey: true, cancelable: true }),
    true,
  );
});

test("empty paper/certificate collections render without errors", () => {
  const view = render(
    <>
      <CertificateStack certificates={[]} />
      <PaperBookshelf papers={[]} />
    </>,
  );
  assert.equal(view.container.childElementCount, 0);
});

test("horizontal paper gestures are consumed at the boundary without blocking vertical scroll", () => {
  const view = render(<PaperBookshelf papers={RESUME_DATA.papers} />);
  const shelf = view.getByRole("group", { name: "Paper bookshelf" });
  assert.equal(
    fireEvent.wheel(shelf, { deltaX: -100, deltaY: 0, cancelable: true }),
    false,
  );
  assert.equal(
    fireEvent.wheel(shelf, { deltaX: 0, deltaY: 100, cancelable: true }),
    true,
  );
});

test("paper bookshelf opens and closes desktop and mobile details", () => {
  const view = render(<PaperBookshelf papers={RESUME_DATA.papers} />);
  const desktop = within(
    view.container.querySelector(".paper-library")! as HTMLElement,
  );
  const book = desktop.getByRole("button", { name: /Dandelion Populations/ });
  fireEvent.click(book);
  assert.equal(book.getAttribute("aria-expanded"), "true");
  assert.ok(desktop.getByRole("link", { name: "Read paper (PDF)" }));
  fireEvent.keyDown(book, { key: "Escape" });
  assert.equal(book.getAttribute("aria-expanded"), "false");
  const mobileBook = view.container.querySelector(".mobile-paper-title")!;
  fireEvent.click(mobileBook);
  assert.equal(mobileBook.getAttribute("aria-pressed"), "true");
  fireEvent.click(view.getByRole("button", { name: "Close paper details" }));
  assert.equal(mobileBook.getAttribute("aria-pressed"), "false");
});
